'use client'

import { useEffect } from 'react'
import Image from 'next/image'

export default function CommissionView ({ imageNameList }: { imageNameList: string[] }): JSX.Element {
  const imageList = imageNameList.map((imageName, idx) => {
    return (
      <div key={idx} className={`commission-transition w-full h-full absolute flex justify-center ${idx === 0 ? '' : 'fadeout'}`}>
        <Image fill={true} className='object-contain' src={`/assets/gallery/${imageName}`} alt={`image in gallery #${idx}`} />
      </div>
    )
  })

  let index = 0
  function changeDisplayedImage (): void {
    const images = document.getElementById('image-post-container')?.children
    if (images === undefined) {
      return
    }
    for (let imgIdx = 0; imgIdx < images.length; imgIdx++) {
      images[imgIdx].classList.add('fadeout')
    }
    index = ++index > images.length ? 1 : index
    images[index - 1].classList.remove('fadeout')
    setTimeout(changeDisplayedImage, 7000)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => changeDisplayedImage, [])
  return (
    <div className='flex w-full h-screen'>
      <div id='image-post-container' className='flex w-3/4 items-center justify-center relative'>
      {imageList.length > 1 ? imageList : <p>No images to display.</p>}
      </div>
      <div className='flex h-full w-1/4 items-center'>
      </div>
    </div>
  )
}
