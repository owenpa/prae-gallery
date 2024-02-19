'use client'

import { type FileObj } from '@/types/types'
import { useEffect, useState } from 'react'
import ImagePost from './ImagePost'

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
      postElement.classList.add('pointer-event-none')
    })
    postElement.addEventListener('animationend', () => {
      Array.from(postElement.getElementsByClassName('nav-button')).forEach(element => {
        element.removeAttribute('disabled')
      })
      postElement.classList.add('pointer-event-none')
    })
  }

  useEffect(() => {
    const currentIdxElement = document.getElementById('image-post-container')?.children[elementIdx]
    const changedIdxElement = document.getElementById('image-post-container')?.children[changedIdx]
    if (currentIdxElement === undefined || changedIdxElement === undefined) {
      return
    }
    const elementIdxClassList = currentIdxElement.classList
    let changedIdxClassList = changedIdxElement.classList

    toggleButtonUse(changedIdxElement)

    changedIdxClassList = changedIdxElement.classList

    if (scrollDirection === 'up') {
      elementIdxClassList.toggle('fadeoutup')
      if (elementIdxClassList.contains('fadeinup') || elementIdxClassList.contains('fadeindown')) {
        elementIdxClassList.toggle('fadeinup', false)
        elementIdxClassList.toggle('fadeindown', false)
      }
      changedIdxClassList.toggle('fadeinup')
      changedIdxClassList.toggle('fadeout', false)
    } else if (scrollDirection === 'down') {
      elementIdxClassList.toggle('fadeoutdown')
      if (elementIdxClassList.contains('fadeindown') || elementIdxClassList.contains('fadeindown')) {
        elementIdxClassList.toggle('fadeindown', false)
        elementIdxClassList.toggle('fadeindup', false)
      }
      changedIdxClassList.toggle('fadeindown')
      changedIdxClassList.toggle('fadeout', false)
    }
  }, [elementIdx, changedIdx, scrollDirection])

  if (imageInfoArray.length !== 0) {
    imageList = imageInfoArray.map((fileObj, idx) => {
      return (
        <div key={idx} className={`flex ${idx === 0 ? '' : 'fadeout'} image-stuff`} onAnimationEnd={(animationEvent) => { handleAnimationEnd((animationEvent.target as HTMLDivElement)) }}>
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
