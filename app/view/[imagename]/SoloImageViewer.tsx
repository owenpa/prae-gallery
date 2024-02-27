'use client'

import Image from 'next/image'

export default function SoloImageViewer ({ imagename, imagetitle, price, description, descriptionfooter, date }: { imagename: string, imagetitle: string, price: string, description: string, descriptionfooter: string, date: string }): JSX.Element {
  return (
    <div>
      <div>
        <Image src={`/assets/gallery/${imagename}`} fill={true} className='object-contain' alt={'solo image'} />
      </div>
      <p>{imagename}</p>
      <p>{imagetitle}</p>
      <p>{price}</p>
      <p>{description}</p>
      <p>{descriptionfooter}</p>
      <p>{date}</p>
    </div>
  )
}
