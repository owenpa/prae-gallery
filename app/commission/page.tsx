'use server'
import { type CommissionPageObj } from '@/types/types'
import { fetchCommissionInformation, pullImageInfoFromDb } from '../../actions'
import CommissionView from './CommissionView'

export default async function Commission (): Promise<JSX.Element> {
  const imageDataList = await pullImageInfoFromDb()
  const commissionInformation: CommissionPageObj = await fetchCommissionInformation()

  return (
    <CommissionView commissionInformation={commissionInformation} imageDataList={imageDataList} />
  )
}
