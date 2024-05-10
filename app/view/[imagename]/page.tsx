import { pullSingleImageInfoFromDb } from '@/actions'
import SoloImageViewer from './SoloImageViewer'
import ImageNoExist from './ImageNoExist'
import type { FileObj } from '../../../types/types'
import SoloImageNavbar from '@/app/ui/SoloImageNavbar'
export default async function SoloImagePage ({ params }: { params: { imagename: string } }): Promise<JSX.Element> {
  const imageData = await pullSingleImageInfoFromDb(params.imagename)
  if (imageData === 0) {
    return (
      <ImageNoExist />
    )
  } else {
    const { imagename, imagetitle, imageurl, price, description, descriptionfooter, date } = imageData as FileObj
    return (
      <div className='flex flex-col w-full h-screen p-10'>
        <SoloImageNavbar/>
        <SoloImageViewer imagename={imagename} imageurl={imageurl} imagetitle={imagetitle} price={price} description={description} descriptionfooter={descriptionfooter} date={date} />
      </div>
    )
  }
}
