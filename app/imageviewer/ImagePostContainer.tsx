'use client'

import { type FileObj } from '@/types/types'
import { useEffect, useState } from 'react'
import ImagePost from './ImagePost'

export default function ImagePostContainer ({ imageInfoArray }: { imageInfoArray: FileObj[] }): JSX.Element {
  let imageList: JSX.Element[] = [<></>]
  const [elementIdx, setElementIdx] = useState(0)
  const [changedIdx, setChangedIdx] = useState(0)
  function setIndexProp (proppedElementIdx: number, proppedChangedIdx: number): void {
    setElementIdx(proppedElementIdx)
    if (proppedChangedIdx === imageInfoArray.length) {
      setChangedIdx(0)
    } else if (proppedChangedIdx === -1) {
      setChangedIdx(imageInfoArray.length - 1)
    } else {
      setChangedIdx(proppedChangedIdx)
    }
  }

  useEffect(() => {
    document.getElementById('image-post-container')?.children[elementIdx].classList.toggle('hidden')
    document.getElementById('image-post-container')?.children[changedIdx].classList.toggle('hidden')
  }, [elementIdx, changedIdx])

  if (imageInfoArray.length !== 0) {
    imageList = imageInfoArray.map((fileObj, idx) => {
      return (
        <div key={idx} className={`flex ${idx === 0 ? '' : 'hidden'}`}>
          <ImagePost setIndexProp={setIndexProp} idx={idx} imagesrc={`/assets/gallery/${fileObj.imagename}`} imagename={fileObj.imagename} imagedesc={fileObj.description}/>
        </div>
      )
    })
  }

  return (
    <div id='image-post-container' className='max-w-full relative'>
      {imageList.length > 1 ? imageList : <p>No images to display.</p>}
    </div>
  )
}
