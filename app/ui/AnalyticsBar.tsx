'use client'
import { ChevronUp } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'

export default function AnalyticsBar ({ data, toggleable }: { data: any[], toggleable: boolean }): JSX.Element {
  const [showAnalytics, setShowAnalytics] = useState(false)

  function findTotalPosts (): number {
    return data.length
  }

  function findTotalLikes (): number {
    return data.reduce((likeTotal: number, currData) => likeTotal + (currData.likes as number), 0)
  }

  function findTotalShares (): number {
    return data.reduce((shareTotal: number, currData) => shareTotal + (currData.shares as number), 0)
  }
  function findAvgLikes (): number {
    if (totalLikes === 0) { return 0 }
    return (Math.round((totalPosts / totalLikes) + Number.EPSILON) * 100) / 100
  }

  function findAvgShares (): number {
    if (totalShares === 0) { return 0 }
    return (Math.round((totalPosts / totalShares) + Number.EPSILON) * 100) / 100
  }

  const totalPosts = findTotalPosts()
  const totalLikes = findTotalLikes()
  const totalShares = findTotalShares()
  const avgLikes = findAvgLikes()
  const avgShares = findAvgShares()

  if (data.length === 0) {
    return (
      <div className='border m-2 flex flex-col px-4 py-6 rounded-lg tracking-wide max-h-[200px] max-w-xl self-center w-full'>
        <p>No images or analytics found in the database.</p>
      </div>
    )
  } else {
    if (toggleable) {
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
                    <p id='total-post'>{totalPosts}</p>
                  </div>
                </li>
                <li>
                  <div>
                    <p># of likes</p>
                    <p id='total-like'>{totalLikes}</p>
                  </div>
                </li>
                <li>
                  <div>
                    <p># of shares</p>
                    <p id='total-share'>{totalShares}</p>
                  </div>
                </li>
              </ul>
              <ul className='flex justify-evenly '>
                <li>
                  <div>
                    <p>avg. likes per post</p>
                    <p id='avg-like-per'>{avgLikes}</p>
                  </div>
                </li>
                <li>
                  <div>
                    <p>avg. shares per post</p>
                    <p id='avg-shares-per'>{avgShares}</p>
                  </div>
                </li>
              </ul>
            </div>
          }
          </>
      )
    } else {
      return (
        <>
          <div className='border m-2 flex flex-col px-4 py-6 rounded-lg tracking-wide max-h-[200px] max-w-xl self-center w-full'>
            <ul className='flex justify-evenly'>
              <li>
                <div>
                  <p># of posts</p>
                  <p id='total-post'>{totalPosts}</p>
                </div>
              </li>
              <li>
                <div>
                  <p># of likes</p>
                  <p id='total-like'>{totalLikes}</p>
                </div>
              </li>
              <li>
                <div>
                  <p># of shares</p>
                  <p id='total-share'>{totalShares}</p>
                </div>
              </li>
            </ul>
            <ul className='flex justify-evenly '>
              <li>
                <div>
                  <p>avg. likes per post</p>
                  <p id='avg-like-per'>{avgLikes}</p>
                </div>
              </li>
              <li>
                <div>
                  <p>avg. shares per post</p>
                  <p id='avg-shares-per'>{avgShares}</p>
                </div>
              </li>
            </ul>
          </div>
        </>
      )
    }
  }
}
