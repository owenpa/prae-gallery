'use server'
import { pullLocalImages } from '../../actions'
import CommissionView from './CommissionView'

export default async function Commission (): Promise<JSX.Element> {
  const imageNameList = await pullLocalImages()
  return (
    <CommissionView imageNameList={imageNameList} />
  )
}
