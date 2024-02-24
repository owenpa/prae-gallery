import { signOut } from '@/auth'
import { Button } from './button'

export default function DashboardNavbar (): JSX.Element {
  return (
    <>
      <ul className='flex justify-between'>
        <p>link</p>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className='text-right self-end' action={async (): Promise<void> => {
          'use server'
          await signOut()
        }}>
          <Button>Sign Out</Button>
        </form>
      </ul>
    </>
  )
}
