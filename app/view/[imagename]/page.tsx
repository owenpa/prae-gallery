import { pullSingleImageInfoFromDb } from '@/actions'
import SoloImageViewer from './SoloImageViewer'
import ImageNoExist from './ImageNoExist'
import type { FileObj } from '../../../types/types'
export default async function SoloImagePage ({ params }: { params: { imagename: string } }): Promise<JSX.Element> {
  const imageData = await pullSingleImageInfoFromDb(params.imagename)
  if (imageData === 0) {
    return (
      <ImageNoExist />
    )
  } else {
    const { imagename, imagetitle, price, description, descriptionfooter, date } = imageData as FileObj
    return (
      <div>
        <SoloImageViewer imagename={imagename} imagetitle={imagetitle} price={price} description={description} descriptionfooter={descriptionfooter} date={date} />
      </div>
    )
  }
}
