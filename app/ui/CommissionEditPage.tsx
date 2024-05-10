'use client'
import { Button } from '@/app/ui/button'
import { Input } from '@/app/ui/input'
import { Textarea } from '@/app/ui/textarea'
import { useEffect, useState } from 'react'
import CommissionPrice from './CommissionPrice'
import { Check, X } from 'lucide-react'

export default function CommissionEditPage (): JSX.Element {
  // load current/prev commissions status into form
  const [textBeforePrices, setTextBeforePrices] = useState('')
  const [textAfterPrices, setTextAfterPrices] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [commissionStatus, setCommissionStatus] = useState('')
  const [prices, setPrices] = useState([<></>])
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

  function handleSubmit (event: FormData): void {
    // TODO
  }

  function handlePreviewPrices (): void {
    const formData = new FormData(document.getElementById('edit-commission-form') as HTMLFormElement)
    const priceArray: JSX.Element[] = []
    let temp: string[] = []

    for (const pair of formData.entries()) {
      if (!(pair[0].startsWith('type-image-')) && !(pair[0].startsWith('set-price-'))) { continue }
      if (pair[0].match(/\d/g)?.[0] === null) { continue }
      if (temp.length === 1) {
        temp.push(pair[1] as string)
        priceArray.push(<p>{temp[0]} : ${temp[1]}</p>)
        temp = []
      } else {
        temp.push(pair[1] as string)
      }
    }
    setPrices(priceArray)
  }

  return (
    <div className='flex flex-col gap-10 max-w-xl w-full'>
      <div className='flex flex-col gap-2 justify-self-center'>
        <div className='border px-4 py-6 rounded-lg tracking-wide gap-2'>
          <form id='edit-commission-form' action={(event) => { handleSubmit(event) }} className='gap-2 flex flex-col'>
            <div className='items-center'>
              <label htmlFor='commission-status' className="text-xl font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline">Open for commissions? </label>
              <label className='cs-checkbox'>
                <input onChange={(e) => { setCommissionStatus(`${e.target.checked}`) }} name='commission-status' type='checkbox'/>
                <span className='cs-checkmark'></span>
              </label>
            </div>

            <label htmlFor="text-before-price">Message before your list of prices</label>
            <Textarea required name="text-before-price" id="text-before-price" onInput={(e) => { setTextBeforePrices((e.target as HTMLTextAreaElement).value) }}></Textarea>

            <label htmlFor='image-price'>Price(s)</label>
            {priceList}
            <label htmlFor='text-after-price'>Message after your list of prices</label>
            <Textarea id="text-after-price" name="text-after-price" onInput={(e) => { setTextAfterPrices((e.target as HTMLTextAreaElement).value) }}/>

            <label htmlFor='contact-info'>Contact Information</label>
            <Input required name='contact-info' id='contact-info' onInput={(e) => { setContactInfo((e.target as HTMLInputElement).value) }}></Input>
            <Button variant={'ghost'} id="" name='' className='hover:bg-[#facc15] hover:text-black' type="submit" >Confirm</Button>
          </form>
        </div>
      </div>
      <div>
        <p className="text-xl font-semibold">Preview for the Commission page:</p>
        <p>Commission status: {commissionStatus === 'true' ? <Check className='inline' color='#77DD77' /> : <X className='inline' color='#ff7a7a'/>}</p>
        <p>{textBeforePrices}</p>
        <p>Prices may vary:</p>
        {prices}
        <p>{textAfterPrices}</p>
        <p>Contact me here:</p>
        <p>{contactInfo}</p>
        <Button variant={'secondary'} onClick={handlePreviewPrices} className='inline my-2'>Load Prices</Button>
      </div>
    </div>
  )
}
