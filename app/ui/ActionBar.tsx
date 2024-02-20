'use client'

import { Heart, Link } from 'lucide-react'
import { Button } from '../ui/button'
import type { MouseEvent } from 'react'

export default function ActionBar ({ setIndexProp, idx, imagename, previouslyLiked }: { setIndexProp: ((prevIdx: number, newIdx: number, direction: string) => void) | undefined, idx: number, imagename: string, previouslyLiked: boolean }): JSX.Element {
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

  return (
    <div className='flex w-full flex-wrap justify-between max-w-80'>
      <Button className='nav-button p-' onClick={() => { handleUpClick() }}>Up</Button>
      <div onClick={(clickEvent: MouseEvent<HTMLDivElement>) => { handleLikeClick(clickEvent) }} className='flex'>
        <button>
          <Heart color='#ff7a7a' className={`hover:fill-red-400 pointer-events-none ${previouslyLiked ? 'fill-red-400' : ''}`} />
        </button>
      </div>
      <button><Link className='hover:stroke-blue-300' /></button>
      <Button className='nav-button' onClick={() => { handleDownClick() }}>Down</Button>
    </div>
  )
}
