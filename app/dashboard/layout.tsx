import DashboardNavbar from '../ui/DashboardNavbar'

export default function Layout ({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <div className='flex flex-col'>
      <DashboardNavbar />
      <main className='w-full'>{children}</main>
    </div>
  )
}
