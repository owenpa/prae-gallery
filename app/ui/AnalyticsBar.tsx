'use client'
import { ChevronUp } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'

export default function AnalyticsBar ({ data }: { data: any[] }): JSX.Element {
  const [showAnalytics, setShowAnalytics] = useState(false)

  return (
    <>
    <Button onClick={() => {
      setShowAnalytics(!showAnalytics)
    }} variant={'ghost'} className='py-10 pt-7 max-w-96'>
        <div className='flex flex-col text-center items-center justify-center'>
          <ChevronUp size={32} className='' />
          <p>Preview Analytics</p>
        </div>
      </Button>
      {showAnalytics &&
        <div className='border m-2 flex flex-col px-4 py-6 rounded-lg tracking-wide max-h-[200px] max-w-xl self-center w-full'>
          <ul className='flex justify-evenly'>
            <li>
              <div>
                <p># of posts</p>
                <p id='total-post'>0</p>
              </div>
            </li>
            <li>
              <div>
                <p># of likes</p>
                <p id='total-like'>1</p>
              </div>
            </li>
            <li>
              <div>
                <p># of shares</p>
                <p id='total-share'>2</p>
              </div>
            </li>
          </ul>
          <ul className='flex justify-evenly '>
            <li>
              <div>
                <p>avg. likes per post</p>
                <p id='avg-like-per'>3</p>
              </div>
            </li>
            <li>
              <div>
                <p>avg. shares per post</p>
                <p id='avg-shares-per'>4</p>
              </div>
            </li>
          </ul>
        </div>
      }
      </>
  )
}
