'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from '../../actions'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { MoveLeft, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

function LoginButton (): JSX.Element {
  const { pending } = useFormStatus()
  return (
    <Button aria-disabled={pending}>Login</Button>
  )
}

export default function Login (): JSX.Element {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  const [viewPassword, setViewPassword] = useState(false)

  function ShowPassword (): JSX.Element {
    return (
      <button onClick={() => { setViewPassword(!viewPassword) }} className='text-left'>
        <Eye className='inline' />
        <p className='inline'> Showing password</p>
      </button>
    )
  }

  function HidePassword (): JSX.Element {
    return (
      <button onClick={() => { setViewPassword(!viewPassword) }} className='text-left'>
        <EyeOff className='inline' />
        <p className='inline'> Hiding password</p>
      </button>
    )
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col'>
      <Link href={'/'}><button className='p-2'><MoveLeft className='hover:stroke-gray-300' color="#ffffff" /></button></Link>
      <form className='grid gap-2' action={dispatch}>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' name='email' placeholder='someone@example.com'/>
        <Label htmlFor='password'>Password</Label>
        <Input id='password' name='password' type={`${viewPassword ? 'text' : 'password'}`} placeholder='********'/>
        {viewPassword ? <ShowPassword /> : <HidePassword />}
        <LoginButton />
        {(errorMessage !== null) && (
          <p className='text-red-800 text-lg'>{errorMessage}</p>
        )}
      </form>
    </div>
  )
};
