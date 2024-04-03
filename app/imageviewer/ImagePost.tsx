'use client'

import Image from 'next/image'
import ActionBar from '../ui/ActionBar'
import { useEffect, useState } from 'react'
import ToggleTheme from '../ui/ToggleTheme'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '../ui/navigation-menu'

export default function ImagePost ({ oneGalleryImage, setIndexProp, idx, imagesrc, imagename, imagedesc, imageprice, imagetitle, imagefooter, imagedate }: { oneGalleryImage: boolean, setIndexProp: (prevIdx: number, newIdx: number, direction: string) => void, idx: number, imagesrc: string, imagename: string, imagedesc: string, imageprice: string, imagetitle: string, imagefooter: string, imagedate: string }): JSX.Element {
  const [previouslyLiked, setPreviouslyLiked] = useState(false)
  useEffect(() => {
    setPreviouslyLiked(localStorage.getItem(imagename) !== null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='grid grid-cols-[50vw_40vw] gap-[5vw] absolute center w-full justify-center h-screen gap'>
      <div className='relative flex justify-center content-center'>
        <Image className='image-stuff' fill={true} sizes='1024px' objectFit='contain' src={imagesrc} alt={`image in gallery #${idx}`} />
      </div>
      <div className='h-full w-full flex flex-col'>
        <div className='h-1/5 flex flex-col self-end'>
          <NavigationMenu className='flex'>
            <NavigationMenuList>
              <NavigationMenuItem>
                <ToggleTheme />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} cursor-pointer`}>
                    Gallery
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/commission" legacyBehavior passHref>
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
        <div className='h-3/5 flex flex-col justify-center gap-2'>
        <p className='text-3xl break-all'>{imagetitle}</p>
          <p className='text-3xl break-all'>{imagename}</p>
          <p className='text-gray-300'>{imageprice}</p>
          <p>{imagedesc}</p>
          <p className='text-gray-500 italic'>{imagefooter}</p>
          <p>{imagedate}</p>
          <ActionBar centerItems={false} oneGalleryImage={oneGalleryImage} setIndexProp={setIndexProp} idx={idx} imagename={imagename} previouslyLiked={previouslyLiked}/>
        </div>
        <div className='h-1/5'></div>
      </div>
    </div>
  )
}
