import { type CommissionPageObj } from '@/types/types'
import { Check, X } from 'lucide-react'

export default function CommissionText ({ commissionInformation }: { commissionInformation: CommissionPageObj }): JSX.Element {
  const { commissionstatus, contactinfo, pricelist, textafterprice, textbeforeprice } = commissionInformation
  const priceListAsElements = JSON.parse(pricelist).map((priceItem: string) => <li key={priceItem}>{priceItem}</li>)

  return (
    <>
      <h1 className='text-3xl'>Commission status: {commissionstatus === 'true' ? <Check className='inline' color='#77DD77' /> : <X className='inline' color='#ff7a7a'/>}</h1>
      <p>{textbeforeprice}</p>
      Prices may vary:
      <ul>
        {priceListAsElements}
      </ul>
      <p>{textafterprice}</p>
      <p>Contact me here: </p>
      <p>{contactinfo}</p>
    </>
  )
}
