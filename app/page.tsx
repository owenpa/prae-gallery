import Link from 'next/link'
import ToggleTheme from './ui/ToggleTheme'
import ImageView from './imageviewer/ImageView'

export default async function Home (): Promise<JSX.Element> {
  return (
    <main>
      <p>
        <ToggleTheme />
        <Link href='/commission'>commission</Link> -
        <Link href='/dashboard'>dashboard</Link> -
        <Link href='login'>login</Link>
      </p>
      <ImageView />
    </main>
  )
}
