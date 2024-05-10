import ImageView from './imageviewer/ImageView'

export default async function Home (): Promise<JSX.Element> {
  return (
    <main>
      <ImageView />
    </main>
  )
}
