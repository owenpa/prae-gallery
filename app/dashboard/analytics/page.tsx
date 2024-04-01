import { pullImageInfoFromDb } from '@/actions'
import AnalyticsBar from '@/app/ui/AnalyticsBar'
import PostWithAnalytics from '@/app/ui/PostWithAnalytics'

export default async function Analytics (): Promise<JSX.Element> {
  const imageInfoArray = await pullImageInfoFromDb()
  const profit = imageInfoArray.reduce((acc, curr) => Number(curr.price) + acc, 0)
  let imagePost: JSX.Element[] = [<></>]
  if (imageInfoArray.length !== 0) {
    imagePost = imageInfoArray.map((fileObj, idx) => {
      return (
        <PostWithAnalytics key={idx}
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
      <p className='text-xl'>Price Of All Content: <p className='inline text-green-300 font-bold'>${profit}</p></p>
      <AnalyticsBar data={imageInfoArray} toggleable={false} />
      {imageInfoArray.length > 0 ? imagePost : <p>No images or analytics to display.</p>}
    </div>
  )
}
