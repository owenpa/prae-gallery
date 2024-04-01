import Image from 'next/image'

export default function HorizontalPost ({ imageID, imageName, imageTitle, imageUrl, likes, shares, price, description, descriptionfooter, date }: { imageID: number, imageName: string, imageTitle: string, imageUrl: string, likes: number, shares: number, price: string, description: string, descriptionfooter: string, date: string }): JSX.Element {
  return (
    <div className='justify-evenly flex border m-2 px-4 py-6 rounded-lg max-w-[800px] w-full'>
      <Image className='max-h-[80vh]' height={300} width={300} alt='looks like an image' src={imageUrl} />
      <div className='flex flex-col max-w-[300px]'>
        <p>{imageTitle} - {date}</p>
        <p>{price}</p>
        <p>{description}</p>
        <p>{descriptionfooter}</p>
      </div>
      <div className='flex flex-col self-center'>
        <p>View</p>
        <p>Edit</p>
        <p>Delete</p>
      </div>
    </div>
  )
}
