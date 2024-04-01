import { signOut } from '@/auth'
import { Button } from './button'
import Link from 'next/link'
import { MoveLeft } from 'lucide-react'

export default function DashboardNavbar (): JSX.Element {
  return (
    <nav className='flex flex-wrap justify-evenly p-6'>
      <ul className='flex self-center justify-center gap-10'>
      <Link href={'/'} className='flex gap-2' ><MoveLeft /> Back To Gallery</Link>
        <Link href={'/dashboard'}>Dashboard</Link>
        <Link href={'/dashboard/create'}>Create Post</Link>
        <Link href={'/dashboard/manage'}>Manage Posts</Link>
        <Link href={'/dashboard/analytics'}>Analytics</Link>
        <Link href={'/dashboard/overview'}>View All</Link>
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
