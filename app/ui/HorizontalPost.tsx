import Image from 'next/image'
import { Link } from 'lucide-react'
import ImageDeleteButton from '../dashboard/ImageDeleteButton'
import DeleteConfirmationModal from '../dashboard/DeleteConfirmationModal'
import EditModal from '../dashboard/EditModal'
import ImageEditButton from '../dashboard/ImageEditButton'

export default function HorizontalPost ({ imageID, imageName, imageTitle, imageUrl, likes, shares, price, description, descriptionfooter, date }: { imageID: number, imageName: string, imageTitle: string, imageUrl: string, likes: number, shares: number, price: string, description: string, descriptionfooter: string, date: string }): JSX.Element {
  return (
    <div className='flex gap-2 justify-evenly border m-2 px-4 py-6 rounded-lg max-w-[800px] w-full'>
      <Image className='max-h-[80vh] m-0' height={300} width={300} alt='looks like an image' src={imageUrl} />
      <div className='flex flex-col max-w-[400px] grow'>
        <p className='font-semibold'>{imageTitle} - {date}</p>
        <p>{price}</p>
        <p>{description}</p>
        <p className='text-gray-500 italic'>{descriptionfooter}</p>
      </div>
      <div className='flex flex-col content-baseline justify-evenly w-min'>
        <a href={`/view/${imageName}`} target='_blank'>
          <Link className='hover:stroke-blue-300 w-10' />
        </a>
        <ImageEditButton
          imageID={imageID}
          imageName={imageName}
          imageTitle={imageTitle}
          price={price}
          description={description}
          descriptionfooter={descriptionfooter}
          date={date}
          />
        <ImageDeleteButton parentFileName={imageName}></ImageDeleteButton>
      </div>
      <DeleteConfirmationModal />
      <EditModal />
    </div>
  )
}
