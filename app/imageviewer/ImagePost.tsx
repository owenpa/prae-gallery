'use client'

import Image from 'next/image'
import ActionBar from '../ui/ActionBar'
import { useEffect, useState } from 'react'

export default function ImagePost ({ setIndexProp, idx, imagesrc, imagename, imagedesc }: { setIndexProp: (prevIdx: number, newIdx: number, direction: string) => void, idx: number, imagesrc: string, imagename: string, imagedesc: string }): JSX.Element {
  const [previouslyLiked, setPreviouslyLiked] = useState(false)
  useEffect(() => {
    setPreviouslyLiked(localStorage.getItem(imagename) !== null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='grid grid-cols-[50vw_40vw] absolute center w-full justify-center h-screen'>
      <div className='relative'>
        <Image className='image-stuff' fill={true} objectFit='contain' src={imagesrc} alt={`image in gallery #${idx}`} />
      </div>
      <div className='max-w self-center'>
        <p className='text-3xl break-all'>{imagename}</p>
        <p>{imagedesc}</p>
        <ActionBar setIndexProp={setIndexProp} idx={idx} imagename={imagename} previouslyLiked={previouslyLiked}/>
      </div>
    </div>
  )
}
