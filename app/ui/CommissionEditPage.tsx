'use client'
import { Button } from '@/app/ui/button'
import { Checkbox } from '@/app/ui/checkbox'
import { Input } from '@/app/ui/input'
import { Textarea } from '@/app/ui/textarea'
import { useEffect, useState } from 'react'
import CommissionPrice from './CommissionPrice'

export default function CommissionEditPage (): JSX.Element {
  // load current/prev commissions status into form
  const [commissionStatus, setCommissionStatus] = useState(false)
  const [textBeforePrices, setTextBeforePrices] = useState('')
  const [textAfterPrices, setTextAfterPrices] = useState('')
  const [contactInfo, setContactInfo] = useState('')

  const [pricesCount, setPricesCount] = useState(0)
  const [priceReqDelete, setPriceReqDelete] = useState(0)

  const priceList: JSX.Element[] = []
  for (let i = 0; i <= pricesCount; i++) {
    priceList.push(<CommissionPrice key={`com${i}`} pricesCount={pricesCount} setPricesCount={setPricesCount} setPriceReqDelete={setPriceReqDelete} idx={i}/>)
  }
  useEffect(() => {
    if (priceReqDelete === 0) return
    document.getElementById(`price${priceReqDelete}`)?.remove()
  }, [priceReqDelete])

  // function logPrices () {
  //   const potentialFormData = new FormData(document.getElementById('price-list') as HTMLFormElement)
  //   console.log(potentialFormData)
  //   for (const key of potentialFormData.entries()) {
  //     console.log(key[0]+ ', ' + key[1])
  //    }
  //  }

  return (
    <div className='flex flex-col gap-10 max-w-xl w-full'>
      <div className='flex flex-col gap-2 justify-self-center'>
        <div className='border px-4 py-6 rounded-lg tracking-wide gap-2'>
          <form className='gap-2 flex flex-col'>
            <div className='items-center'>
              <label htmlFor='commission-status' className="text-xl font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline">Open for commissions? </label>
              <Checkbox className='inline' id='commission-status' onClick={(e) => { setCommissionStatus(!commissionStatus) }} />
            </div>

            <label htmlFor="text-before-price">Message before your list of prices</label>
            <Textarea required name="text-before-price" id="text-before-price" onInput={(e) => { setTextBeforePrices((e.target as HTMLTextAreaElement).value) }}></Textarea>

            <label htmlFor='image-price'>Price(s)</label>
            <form id='price-list' className='gap-2 flex flex-col'>
              {priceList}
            </form>
            <label htmlFor='text-after-price'>Message after your list of prices</label>
            <Textarea id="text-after-price" name="text-after-price" onInput={(e) => { setTextAfterPrices((e.target as HTMLTextAreaElement).value) }}/>

            <label htmlFor='contact-info'>Contact Information</label>
            <Input required name='contact-info' id='contact-info' onInput={(e) => { setContactInfo((e.target as HTMLInputElement).value) }}></Input>
            <Button variant={'ghost'} id="" name='' onClick={(e) => {
              e.preventDefault()
              // logPrices()
            }} className='hover:bg-[#facc15] hover:text-black' type="submit" >Confirm</Button>
          </form>
        </div>
      </div>
      <div>
        <p className="text-xl font-semibold">Preview for the Commission page:</p>
        <p>Commission status: {commissionStatus ? 'true' : 'false'}</p>
        <p>{textBeforePrices}</p>
        {/* <p>{prices}</p> */}
        <p>{textAfterPrices}</p>
        <p>{contactInfo}</p>
      </div>
    </div>
  )
}
