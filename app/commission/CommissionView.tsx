'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../ui/navigation-menu'
import Link from 'next/link'
import ToggleTheme from '../ui/ToggleTheme'
import NoImages from '../ui/NoImages'

export default function CommissionView ({ imageNameList }: { imageNameList: string[] }): JSX.Element {
  const imageList = imageNameList.map((imageName, idx) => {
    return (
      <div key={idx} className={`commission-transition w-full h-full absolute flex justify-center ${idx === 0 ? '' : 'commission-fadeout'}`}>
        <Image fill={true} className='object-contain image-stuff' src={`/assets/gallery/${imageName}`} alt={`image in gallery #${idx}`} />
      </div>
    )
  })

  let index = 0
  function changeDisplayedImage (): void {
    const images = document.getElementById('gallery-image-container')?.children
    if (images === undefined) {
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
    return (
      <NoImages />
    )
  } else {
    return (
      <div className='grid grid-cols-[50vw_40vw] gap-[5vw] w-full h-screen center justify-center'>
        <div id='gallery-image-container' className='items-center justify-center relative'>
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
                  <Link href="/commission" passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Commission
                    </NavigationMenuLink>
                  </Link>
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
            <h1 className='text-3xl'>Commission status: <X className='inline' color='#ff7a7a' /></h1>
            Prices may vary:
            <ul>
              <li>$$ : ???</li>
              <li>$$ : ???</li>
              <li>$$ : ???</li>
              <li>$$ : ???</li>
            </ul>
            <p>Contact me here: </p>
            <a href='mailto:someone@example.com'>someone@example.com</a>
          </div>
          <div className='h-1/5'></div>
        </div>
      </div>
    )
  }
}
