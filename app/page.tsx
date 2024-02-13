import { pullImageInfoFromDb } from '../actions'

export default async function Home (): Promise<JSX.Element> {
  const imageInfoArray = await pullImageInfoFromDb()
  const imagePost = imageInfoArray.map((fileObj, idx) => {
    return (
      <div key={idx}>
        <h1>{fileObj.imagename}</h1>
        <img src={`../assets/gallery/${fileObj.imagename}`}></img>
        <p>{fileObj.description}</p>
      </div>
    )
  })
  return (
    <main>
      <p>commission - dashboard - login</p>
      {imagePost}
    </main>
  )
}
