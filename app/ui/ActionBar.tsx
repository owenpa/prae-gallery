'use client'

import { Heart, Link } from 'lucide-react'
import { Button } from '../ui/button'
import type { MouseEvent } from 'react'

export default function ActionBar ({ centerItems, oneGalleryImage, setIndexProp, idx, imagename, previouslyLiked }: { centerItems: boolean, oneGalleryImage: boolean, setIndexProp: ((prevIdx: number, newIdx: number, direction: string) => void) | undefined, idx: number, imagename: string, previouslyLiked: boolean }): JSX.Element {
  function handleUpClick (): void {
    setIndexProp !== undefined && setIndexProp(idx, idx + 1, 'up')
  }

  function handleDownClick (): void {
    setIndexProp !== undefined && setIndexProp(idx, idx - 1, 'down')
  }

  function handleLikeClick (clickEvent: MouseEvent<HTMLDivElement>): void {
    (clickEvent.target as HTMLElement).firstElementChild?.classList.toggle('fill-red-400')
    if (localStorage.getItem(imagename) !== null) {
      localStorage.removeItem(imagename)
    } else {
      localStorage.setItem(imagename, '1')
      try {
        void fetch('/api/likepost', {
          method: 'POST',
          body: JSON.stringify(imagename)
        })
        // execute like animation on successful response
      } catch (error) {
        console.error(`Error liking image ${imagename}`)
      }
    }
  }

  function handleLinkClick (clickEvent: MouseEvent<HTMLButtonElement>): void {
    try {
      void fetch('/api/share', {
        method: 'POST',
        body: JSON.stringify(imagename)
      })
      void navigator.clipboard.writeText(`${window.location.origin}/view/${imagename}`)
    } catch (error) {
      console.error(`Error while sharing image ${imagename}`)
    }
  }

  return (
    <div className={`flex w-full flex-wrap h-10 ${oneGalleryImage ? 'gap-2' : 'justify-between max-w-80'} ${centerItems ? 'justify-center' : ''}`}>
      {!oneGalleryImage && <Button className='nav-button' onClick={() => { handleUpClick() }}>Up</Button>}
      <div onClick={(clickEvent: MouseEvent<HTMLDivElement>) => { handleLikeClick(clickEvent) }} className='flex'>
        <button>
          <Heart color='#ff7a7a' className={`hover:fill-red-400 pointer-events-none ${previouslyLiked ? 'fill-red-400' : ''}`} />
        </button>
      </div>
      <button onClick={(clickEvent: MouseEvent<HTMLButtonElement>) => { handleLinkClick(clickEvent) }}><Link className='hover:stroke-blue-300' /></button>
     {!oneGalleryImage && <Button className='nav-button' onClick={() => { handleDownClick() }}>Down</Button>}
    </div>
  )
}
