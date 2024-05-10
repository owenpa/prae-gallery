import { pullImageInfoFromDb } from '@/actions'
import HorizontalPost from '../../ui/HorizontalPost'

export default async function Analytics (): Promise<JSX.Element> {
  const imageInfoArray = await pullImageInfoFromDb()
  let imagePost: JSX.Element[] = [<></>]
  if (imageInfoArray.length !== 0) {
    imagePost = imageInfoArray.map((fileObj, idx) => {
      return (
        <HorizontalPost key={idx}
        imageID={fileObj.imageid}
        imageName={fileObj.imagename}
        imageTitle={fileObj.imagetitle}
        imageUrl={fileObj.imageurl}
        likes={fileObj.likes}
        shares={fileObj.shares}
        price={fileObj.price}
        description={fileObj.description}
        descriptionfooter={fileObj.descriptionfooter}
        date={fileObj.date}
         />
      )
    })
  }

  return (
    <div className='flex flex-col gap-2 items-center justify-center'>
      {imageInfoArray.length > 0 ? imagePost : <p>No images or analytics to display.</p>}
    </div>
  )
}
