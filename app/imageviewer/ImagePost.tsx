'use client'

import Image from 'next/image'
import { Button } from '../ui/button'

export default function ImagePost ({ setIndexProp, idx, imagesrc, imagename, imagedesc }: { setIndexProp: (prevIdx: number, newIdx: number, direction: string) => void, idx: number, imagesrc: string, imagename: string, imagedesc: string }): JSX.Element {
  function handleUpClick (): void {
    setIndexProp(idx, idx + 1, 'up')
  }

  function handleDownClick (): void {
    setIndexProp(idx, idx - 1, 'down')
  }

  return (
    <div className='grid grid-cols-[50vw_40vw] absolute center w-full justify-center h-screen'>
      <div className='relative'>
        <Image fill={true} className='object-contain' src={imagesrc} alt={`image in gallery #${idx}`} />
      </div>
      <div className='max-w self-center'>
        <p className='text-3xl break-all'>{imagename}</p>
        <p>{imagedesc}</p>
        <Button className='nav-button' onClick={() => { handleUpClick() }}>Up</Button>
        <Button className='nav-button' onClick={() => { handleDownClick() }}>Down</Button>
      </div>
    </div>
  )
}
