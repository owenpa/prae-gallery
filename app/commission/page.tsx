'use server'
import { pullImageInfoFromDb } from '../../actions'
import CommissionView from './CommissionView'

export default async function Commission (): Promise<JSX.Element> {
  const imageDataList = await pullImageInfoFromDb()
  return (
    <CommissionView imageDataList={imageDataList} />
  )
}
