'use server'

import { pullImageInfoFromDb } from '../../actions'
import ImagePostContainer from './ImagePostContainer'

export default async function ImageView (): Promise<JSX.Element> {
  const imageInfoArray = await pullImageInfoFromDb()

  return (
    <ImagePostContainer imageInfoArray={imageInfoArray} />
  )
}
