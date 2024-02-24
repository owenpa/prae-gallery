export default function Layout ({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <div className='flex'>
      <main className='w-full'>{children}</main>
    </div>
  )
}
