'use client'

import { type FileObj } from '@/types/types'
import { useEffect, useState } from 'react'
import ImagePost from './ImagePost'
import NoImages from '../ui/NoImages'

export default function ImagePostContainer ({ imageInfoArray }: { imageInfoArray: FileObj[] }): JSX.Element {
  let imageList: JSX.Element[] = [<></>]
  const [elementIdx, setElementIdx] = useState(0)
  const [changedIdx, setChangedIdx] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('')
  function setIndexProp (proppedElementIdx: number, proppedChangedIdx: number, direction: string): void {
    setElementIdx(proppedElementIdx)
    setScrollDirection(direction)
    if (proppedChangedIdx === imageInfoArray.length) {
      setChangedIdx(0)
    } else if (proppedChangedIdx === -1) {
      setChangedIdx(imageInfoArray.length - 1)
    } else {
      setChangedIdx(proppedChangedIdx)
    }
  }

  function handleAnimationEnd (divElement: HTMLDivElement): void {
    if (divElement.classList.contains('fadeoutup') || divElement.classList.contains('fadeoutdown')) {
      divElement.className = 'flex fadeout image-stuff'
    } else if (divElement.classList.contains('fadeinup') || divElement.classList.contains('fadeindown')) {
      divElement.className = 'flex image-stuff'
    }
  }

  function toggleButtonUse (postElement: Element): void {
    postElement.addEventListener('animationstart', () => {
      Array.from(postElement.getElementsByClassName('nav-button')).forEach(element => {
        element.setAttribute('disabled', 'true')
      })
    })
    postElement.addEventListener('animationend', () => {
      Array.from(postElement.getElementsByClassName('nav-button')).forEach(element => {
        element.removeAttribute('disabled')
      })
    })
  }

  useEffect(() => {
    const currentIdxElement = document.getElementById('image-post-container')?.children[elementIdx]
    const changedIdxElement = document.getElementById('image-post-container')?.children[changedIdx]
    const currentImageElement = currentIdxElement?.getElementsByTagName('img')[0]
    const changedImageElement = changedIdxElement?.getElementsByTagName('img')[0]
    if (currentIdxElement === undefined || changedIdxElement === undefined) {
      return
    }
    const currentIdxClassList = currentIdxElement.classList
    let changedIdxClassList = changedIdxElement.classList

    toggleButtonUse(changedIdxElement)

    changedIdxClassList = changedIdxElement.classList

    if (scrollDirection === 'up') {
      currentIdxClassList.toggle('fadeout')
      currentIdxClassList.toggle('fadein', false)
      currentImageElement?.classList.toggle('fadeoutup')
      currentImageElement?.classList.toggle('fadeinup', false)
      currentImageElement?.classList.toggle('fadeindown', false)

      changedImageElement?.classList.toggle('fadeinup')
      changedIdxClassList.toggle('fadeout', false)
      changedIdxClassList.toggle('fadein')
      changedIdxClassList.toggle('hidden', false)
    } else if (scrollDirection === 'down') {
      currentIdxClassList.toggle('fadeout')
      currentIdxClassList.toggle('fadein', false)
      currentImageElement?.classList.toggle('fadeoutdown')
      currentImageElement?.classList.toggle('fadeinup', false)
      currentImageElement?.classList.toggle('fadeindown', false)

      changedImageElement?.classList.toggle('fadeindown')
      changedIdxClassList.toggle('fadeout', false)
      changedIdxClassList.toggle('fadein')
      changedIdxClassList.toggle('hidden', false)
    }
  }, [elementIdx, changedIdx, scrollDirection])

  if (imageInfoArray.length === 0) {
    return (
      <NoImages />
    )
  } else {
    imageList = imageInfoArray.map((fileObj, idx) => {
      return (
        <div key={idx} className={`flex ${idx === 0 ? 'fadein' : 'hidden'} image-stuff`} onAnimationEnd={(animationEvent) => { handleAnimationEnd((animationEvent.target as HTMLDivElement)) }}>
          <ImagePost setIndexProp={setIndexProp} idx={idx} imagesrc={`/assets/gallery/${fileObj.imagename}`} imagename={fileObj.imagename} imagedesc={fileObj.description} imageprice={fileObj.price}/>
        </div>
      )
    })
    return (
      <>
        <div id='image-post-container' className='max-w-full relative'>
          {imageList}
        </div>
      </>
    )
  }
}
