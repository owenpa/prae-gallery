import { type Dispatch, type SetStateAction } from 'react'
import { Button } from './button'
import { Input } from './input'

export default function CommissionPrice ({ idx, pricesCount, setPricesCount, setPriceReqDelete }: { idx: number, pricesCount: number, setPricesCount: Dispatch<SetStateAction<number>>, setPriceReqDelete: Dispatch<SetStateAction<number>> }): JSX.Element {
  return (
    <div id={`price${idx}`} className='flex gap-2'>
      <Input id={`idx${idx}`} name={`idx${idx}`} required placeholder='Type of image'></Input>
      <Input id={`2${idx}`} name={`2${idx}`} required type='number' max='1000000000' placeholder='Amount'></Input>
      <Button id={`plus${idx}`} type='button' onClick={() => { setPricesCount(pricesCount + 1) }}>+</Button>
      {idx !== 0
        ? <Button id={`minus${idx}`} className='bg-red-500 hover:bg-red-600' type='button' onClick={() => {
          setPriceReqDelete(idx)
        }}>-</Button>
        : <div className='w-[100px]'></div>
      }
    </div>
  )
}
