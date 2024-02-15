'use server'
import Image from 'next/image'
import { pullImageInfoFromDb } from '../../actions'

export default async function ImageView (): Promise<JSX.Element> {
  const imageInfoArray = await pullImageInfoFromDb()
  let imagePost: JSX.Element[] = [<></>]
  if (imageInfoArray.length !== 0) {
    imagePost = imageInfoArray.map((fileObj, idx) => {
      return (
        <div key={idx}>
          <h1>{fileObj.imagename}</h1>
          <Image width={'100'} height={'100'} src={`/assets/gallery/${fileObj.imagename}`} alt={`image in gallery #${idx}`} />
          <p>{fileObj.description}</p>
        </div>
      )
    })
  }

  return (
    <div>
            {imageInfoArray.length > 0 ? imagePost : <p>No images to display.</p>}
    </div>
  )
}
