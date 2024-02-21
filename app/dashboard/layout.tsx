import SideDashboardNav from '../ui/SideDashboardNav'

export default function Layout ({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <div className='flex'>
      <SideDashboardNav />
      <main className='w-full'>{children}</main>
    </div>
  )
}
