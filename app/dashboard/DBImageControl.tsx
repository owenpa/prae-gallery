import { pullImageInfoFromDb } from '@/actions'
import ImageDeleteButton from './ImageDeleteButton'
import ConfirmationModal from './ConfirmationModal'
import Image from 'next/image'

export default async function DBImageControl (): Promise<JSX.Element> {
  const imageInfoArray = await pullImageInfoFromDb()
  let imagePost: JSX.Element[] = [<></>]
  if (imageInfoArray.length !== 0) {
    imagePost = imageInfoArray.map((fileObj, idx) => {
      return (
        <div className='flex px-4 py-6 rounded-lg tracking-wide border cursor-pointer max-h-[200px] w-[80vw] max-w-xl' key={idx}>
          <div className='w-full max-w-80 relative'>
            <Image fill={true} objectFit='contain' src={fileObj.imageurl} alt={`img${idx}`}></Image>
          </div>
          <div className='w-3/5'>
            <p>{fileObj.imagetitle}</p>
            <h1>{fileObj.imagename}</h1>
            <p>{fileObj.description}</p>
            <p>{fileObj.descriptionfooter}</p>
            <p>{fileObj.date}</p>
          </div>
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
