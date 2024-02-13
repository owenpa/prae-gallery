import { pullImageInfoFromDb } from '@/actions'
// import { deleteImageInfoFromDb } from "@/actions"
export default async function DBImageControl (): Promise<JSX.Element> {
  const imageInfoArray = await pullImageInfoFromDb()
  const imagePost = imageInfoArray.map((fileObj, idx) => {
    return (
      <div key={idx}>
        <h1>{fileObj.imagename}</h1>
        <img className="max-w-80" src={`../assets/gallery/${fileObj.imagename}`}></img>
        <p>{fileObj.description}</p>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" id={fileObj.imagename}>Delete</button>
      </div>
    )
  })

  return (
    <div>
      {imagePost}
    </div>
  )
}
