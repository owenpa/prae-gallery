import Image from 'next/image'
import { Button } from './button'
// Display the percentile or rank of the post's likes/shares
export default function PostWithAnalytics ({ imageID, imageName, imageTitle, imageUrl, likes, shares, price, description, descriptionfooter, date }: { imageID: number, imageName: string, imageTitle: string, imageUrl: string, likes: number, shares: number, price: string, description: string, descriptionfooter: string, date: string }): JSX.Element {
  const today = new Date()
  const postsDate = new Date(date)
  return (
    <div className='justify-evenly flex border m-2 px-4 py-6 rounded-lg max-w-[800px] w-full'>
      <Image className='m-h-[80vh] m-0' height={250} width={250} alt='looks like an image' src={imageUrl} />
      <div className='flex flex-col justify-around'>
        <div>
          <p >{imageTitle} - {date}</p>
          <p className='inline text-gray-400'>
            {Math.round((today.getTime() - postsDate.getTime()) / 86400000) - 1} day(s) since upload </p>
          <p>{price}</p>
        </div>
        <div>
          <p>Likes: {likes}</p>
          <p>Shares: {shares}</p>
        </div>
      </div>
      <div className='flex flex-col self-center'>
        <a href={`/view/${imageName}`} target='_blank'>
          <Button className='text-white' variant={'link'}>View</Button>
        </a>
      </div>
    </div>
  )
}
