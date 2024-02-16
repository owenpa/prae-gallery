'use client'

import Image from 'next/image'
import { Button } from '../ui/button'

export default function ImagePost ({ setIndexProp, idx, imagesrc, imagename, imagedesc }: { setIndexProp: (prevIdx: number, newIdx: number) => void, idx: number, imagesrc: string, imagename: string, imagedesc: string }): JSX.Element {
  function handleUpClick (): void {
    setIndexProp(idx, idx + 1)
  }

  function handleDownClick (): void {
    setIndexProp(idx, idx - 1)
  }

  return (
    <div className='grid grid-cols-[50vw_40vw] absolute center w-full justify-center h-screen'>
      <div className='relative'>
        <Image fill={true} className='object-contain' src={imagesrc} alt={`image in gallery #${idx}`} />
      </div>
      <div className='max-w self-center'>
        <p className='text-3xl break-all'>{imagename}</p>
        <p>{imagedesc}</p>
        <Button onClick={() => { handleUpClick() }}>Up</Button>
        <Button onClick={() => { handleDownClick() }}>Down</Button>
      </div>
    </div>
  )
}
