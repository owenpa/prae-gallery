'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../ui/navigation-menu'
import Link from 'next/link'
import ToggleTheme from '../ui/ToggleTheme'
import NoImages from '../ui/NoImages'
import { type CommissionPageObj, type FileObj } from '@/types/types'
import CommissionText from './CommissionText'

export default function CommissionView ({ imageDataList, commissionInformation }: { commissionInformation: CommissionPageObj, imageDataList: FileObj[] }): JSX.Element {
  const imageList = imageDataList.map((imageData, idx) => {
    return (
      <div key={idx} className={`commission-transition w-full h-full absolute flex justify-center ${idx === 0 ? '' : 'commission-fadeout'}`}>
        <Image fill={true} sizes='1024px' className='object-contain image-stuff' src={imageData.imageurl} alt={`image in gallery #${idx}`} />
      </div>
    )
  })

  let index = 0
  function changeDisplayedImage (): void {
    const images = document.getElementById('gallery-image-container')?.children
    if (images === undefined || images.length === 1) {
      return
    }
    for (let imgIdx = 0; imgIdx < images.length; imgIdx++) {
      images[imgIdx].classList.add('commission-fadeout')
    }
    index = ++index > images.length ? 1 : index
    images[index - 1].classList.remove('commission-fadeout')
    setTimeout(changeDisplayedImage, 8000)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => changeDisplayedImage, [])
  if (imageList.length === 0) {
    return <NoImages />
  } else {
    return (
      <div className='grid grid-cols-[50vw_40vw] gap-[5vw] w-full h-screen center justify-center'>
        <div id='gallery-image-container' className='items-center justify-center relative'>
          {imageList}
        </div>
        <div className='flex flex-col h-full justify-center items-center'>
          <div className='h-1/5 flex flex-col self-end'>
            <NavigationMenu className='flex'>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <ToggleTheme />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Gallery
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} cursor-pointer`}>
                    Commission
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/login" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Login
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className='h-3/5 w-full flex flex-col justify-center'>
            <CommissionText commissionInformation={commissionInformation} />
          </div>
          <div className='h-1/5'></div>
        </div>
      </div>
    )
  }
}
