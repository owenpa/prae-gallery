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
        <div className='flex px-4 py-6 rounded-lg tracking-wide border max-h-[200px] w-[80vw] max-w-xl gap-2' key={idx}>
          <div className='w-full max-w-52 relative'>
            <Image fill={true} objectFit='contain' src={fileObj.imageurl} alt={`img${idx}`}></Image>
          </div>
          <div className='w-3/5'>
            <p className='font-semibold'>{fileObj.imagetitle}</p>
            <h1 className='font-semibold'>{fileObj.imagename}</h1>
            <p>{fileObj.description}</p>
            <p className='text-gray-500 italic'>{fileObj.descriptionfooter}</p>
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
