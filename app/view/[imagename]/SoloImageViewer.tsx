'use client'

import ActionBar from '@/app/ui/ActionBar'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function SoloImageViewer ({ imagename, imagetitle, price, description, descriptionfooter, date }: { imagename: string, imagetitle: string, price: string, description: string, descriptionfooter: string, date: string }): JSX.Element {
  const [previouslyLiked, setPreviouslyLiked] = useState(false)
  useEffect(() => {
    setPreviouslyLiked(localStorage.getItem(imagename) !== null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='w-full h-full flex flex-col items-center text-center justify-center'>
        <div className='w-full h-[60%] relative'>
          <Image className='image-stuff' src={`/assets/gallery/${imagename}`} fill={true} objectFit='contain' alt={'solo image'} />
        </div>
        <div className='flex flex-col items-center max-w-80 break-all'>
          <h1 className='text-5xl'>{imagetitle}</h1>
          <p className='text-gray-300'>{price}</p>
          <p>{description}</p>
          <p className='text-gray-500 italic'>{descriptionfooter}</p>
          <p>{date}</p>
          <ActionBar centerItems={true} oneGalleryImage={true} setIndexProp={undefined} idx={0} imagename={imagename} previouslyLiked={previouslyLiked} />
        </div>
      </div>
    </div>
  )
}
