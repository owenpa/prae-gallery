import Link from 'next/link'
import ToggleTheme from './ui/ToggleTheme'
import ImageView from './imageviewer/ImageView'

export default async function Home (): Promise<JSX.Element> {
  return (
    <main>
      <p className='absolute top-0 right-0'>
        <ToggleTheme />
        <Link href='/commission'>commission</Link> -
        <Link href='login'>login</Link>
      </p>
      <ImageView />
    </main>
  )
}
