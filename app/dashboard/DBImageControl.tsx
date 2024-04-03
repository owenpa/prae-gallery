import { pullImageInfoFromDb } from '@/actions'
import ImageDeleteButton from './ImageDeleteButton'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import Image from 'next/image'
import { Link } from 'lucide-react'
import ImageEditButton from './ImageEditButton'
import EditModal from './EditModal'

export default async function DBImageControl (): Promise<JSX.Element> {
  const imageInfoArray = await pullImageInfoFromDb()
  let imagePost: JSX.Element[] = [<></>]
  if (imageInfoArray.length !== 0) {
    imagePost = imageInfoArray.map((fileObj, idx) => {
      return (
        <div className='flex px-4 py-6 rounded-lg tracking-wide border max-h-[200px] w-[80vw] max-w-xl gap-2' key={idx}>
          <div className='w-full max-w-52 relative'>
            <Image fill={true} objectFit='contain' sizes='208px' src={fileObj.imageurl} alt={`img${idx}`}></Image>
          </div>
          <div className='w-3/5'>
            <p className='font-semibold'>{fileObj.imagetitle}</p>
            <h1 className='font-semibold'>{fileObj.imagename}</h1>
            <p className='limited-description'>{fileObj.description}</p>
            <p className='text-gray-500 italic'>{fileObj.descriptionfooter}</p>
            <p>{fileObj.date}</p>
          </div>
          <div className='flex flex-col justify-evenly'>
            <button>
              <Link className='hover:stroke-blue-300 w-10' />
            </button>
            <ImageEditButton imageID={fileObj.imageid} imageName={fileObj.imagename} imageTitle={fileObj.imagetitle} price={fileObj.price} description={fileObj.description} descriptionfooter={fileObj.descriptionfooter} date={fileObj.date}/>
            <ImageDeleteButton parentFileName={fileObj.imagename}></ImageDeleteButton>
          </div>
        </div>
      )
    })
  }

  return (
    <div>
      {imageInfoArray.length > 0 ? imagePost : <p>No images to display.</p>}
      <EditModal/>
      <DeleteConfirmationModal />
    </div>
  )
}
