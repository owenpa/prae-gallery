import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { addImageInfoToDB } from '../../../actions'
import type { ImageDataToDB } from '@/types/types'

export async function POST (req: NextRequest):
Promise<NextResponse<{ error: string }> | NextResponse<{ Message: string, status: number }>> {
  const formData = await req.formData()
  const formMetadata: ImageDataToDB = Object.fromEntries((new URL(req.url)).searchParams)
  const file = formData.get('file')
  if (file === null) { return NextResponse.json({ error: 'No files received.' }, { status: 400 }) }
  const buffer = Buffer.from(await (file as File).arrayBuffer())
  const filename = (file as File).name.replaceAll(' ', '_')
  try {
    await writeFile(path.join(process.cwd(), 'public/assets/gallery/' + filename), buffer)
    await addImageInfoToDB(formMetadata)
    return NextResponse.json({ Message: 'Success', status: 201 })
  } catch (error) {
    console.error('Error occurred during image saving: ', error)
    return NextResponse.json({ Message: 'Failed', status: 500 })
  }
}
