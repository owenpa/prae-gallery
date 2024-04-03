import Image from 'next/image'
import { Button } from './button'
export default function PostWithAnalytics ({ imageID, imageName, imageTitle, imageUrl, likes, shares, price, description, descriptionfooter, date, totalLikes, totalShares }: { imageID: number, imageName: string, imageTitle: string, imageUrl: string, likes: number, shares: number, price: string, description: string, descriptionfooter: string, date: string, totalLikes: number, totalShares: number }): JSX.Element {
  const today = new Date()
  const postsDate = new Date(date)
  return (
    <div className='justify-evenly flex border m-2 px-4 py-6 rounded-lg max-w-[800px] w-full'>
      <Image className='m-h-[80vh] m-0' height={250} width={250} alt='looks like an image' src={imageUrl} />
      <div className='flex flex-col justify-around'>
        <div>
          <p className='font-bold'>{imageTitle} - {date}</p>
          <p className='inline text-gray-400'>
            {Math.round((today.getTime() - postsDate.getTime()) / 86400000) - 1} day(s) since upload
          </p>
          <p>{price}</p>
        </div>
        <div>
          <p className='inline'>Likes: {likes} </p>
          <p className='inline text-gray-400'>({likes / totalLikes * 100}%)</p>
          <div>
            <p className='inline'>Shares: {shares} </p>
            <p className='inline text-gray-400'>({shares / totalShares * 100}%)</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col self-center'>
        <a href={`/view/${imageName}`} target='_blank'>
          <Button className='text-white ' variant={'link'}>View</Button>
        </a>
      </div>
    </div>
  )
}
