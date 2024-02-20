import { pullImageInfoFromDb } from '@/actions'
import ImageDeleteButton from './ImageDeleteButton'
import ConfirmationModal from './ConfirmationModal'

export default async function DBImageControl (): Promise<JSX.Element> {
  const imageInfoArray = await pullImageInfoFromDb()
  let imagePost: JSX.Element[] = [<></>]
  if (imageInfoArray.length !== 0) {
    imagePost = imageInfoArray.map((fileObj, idx) => {
      return (
        <div key={idx}>
          <p>{fileObj.imagetitle}</p>
          <h1>{fileObj.imagename}</h1>
          <img className="max-w-80" src={`../assets/gallery/${fileObj.imagename}`}></img>
          <p>{fileObj.description}</p>
          <p>{fileObj.descriptionfooter}</p>
          <p>{fileObj.date}</p>
          <ImageDeleteButton parentFileName={fileObj.imagename} />
        </div>
      )
    })
  }

  return (
    <div>
      {imageInfoArray.length > 0 ? imagePost : <p>No images to display.</p>}
      <ConfirmationModal />
    </div>
  )
}
