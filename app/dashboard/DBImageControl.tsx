import { pullImageInfoFromDb } from '@/actions'
import ImageDeleteButton from './ImageDeleteButton'
import ConfirmationModal from './ConfirmationModal'

// import { deleteImageInfoFromDb } from "@/actions"
export default async function DBImageControl (): Promise<JSX.Element> {
  const imageInfoArray = await pullImageInfoFromDb()
  const imagePost = imageInfoArray.map((fileObj, idx) => {
    return (
      <div key={idx}>
        <h1>{fileObj.imagename}</h1>
        <img className="max-w-80" src={`../assets/gallery/${fileObj.imagename}`}></img>
        <p>{fileObj.description}</p>
        <ImageDeleteButton parentFileName={fileObj.imagename} />
      </div>
    )
  })

  return (
    <div>
      {imagePost}
      <ConfirmationModal />
    </div>
  )
}
