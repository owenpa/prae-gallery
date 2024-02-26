import { signOut } from '@/auth'
import { Button } from './button'
import Link from 'next/link'
import { MoveLeft } from 'lucide-react'

export default function DashboardNavbar (): JSX.Element {
  return (
    <nav className='flex flex-wrap justify-evenly p-6'>
      <ul className='flex self-center justify-center gap-10'>
      <Link href={'/'} className='flex gap-2' ><MoveLeft /> Back To Gallery</Link>
        <Link href={'/dashboard'}>General Overview</Link>
        <Link href={'/upload'}>Upload</Link>
        <Link href={'/manage'}>Manage Posts</Link>
        <Link href={'/analytics'}>Analytics</Link>
        <Link href={'/view'}>View All</Link>
      </ul>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className='text-right self-end' action={async (): Promise<void> => {
        'use server'
        await signOut()
      }}>
          <Button>Sign Out</Button>
        </form>
    </nav>
  )
}
