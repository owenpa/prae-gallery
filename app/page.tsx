import { pullImageInfoFromDb } from '../actions'

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
        <a href='/commission'>commission</a> -
        <a href='/dashboard'>dashboard</a> -
        <a href='login'>login</a>
      </p>
      {imageInfoArray.length > 0 ? imagePost : <p>No images to display.</p>}
    </main>
  )
}
