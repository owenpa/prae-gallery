import Link from 'next/link'
import { pullImageInfoFromDb } from '../actions'
import { ToggleTheme } from './ui/ToggleTheme'

export default async function Home (): Promise<JSX.Element> {
  const imageInfoArray = await pullImageInfoFromDb()
  let imagePost: JSX.Element[] = [<></>]
  if (imageInfoArray.length !== 0) {
    imagePost = imageInfoArray.map((fileObj, idx) => {
      return (
        <div key={idx}>
          <h1>{fileObj.imagename}</h1>
          <img src={`../assets/gallery/${fileObj.imagename}`}></img>
          <p>{fileObj.description}</p>
        </div>
      )
    })
  }
  return (
    <main>
      <p>
        <ToggleTheme />
        <Link href='/commission'>commission</Link> -
        <Link href='/dashboard'>dashboard</Link> -
        <Link href='login'>login</Link>
      </p>
      {imageInfoArray.length > 0 ? imagePost : <p>No images to display.</p>}
    </main>
  )
}
