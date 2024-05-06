import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { addImageInfoToDB } from '../../../actions'
import type { ImageDataToDB } from '@/types/types'

export async function POST (req: NextRequest):
Promise<NextResponse<{ error: string }> | NextResponse<{ Message: string, status: number }>> {
  try {
    if (req.body === null) throw new Error('Body is null')
    const formMetadata: ImageDataToDB = Object.fromEntries((new URL(req.url)).searchParams)
    await addImageInfoToDB(formMetadata)
    return NextResponse.json({ Message: 'Success', status: 201 })
  } catch (error) {
    console.error('Error occurred during image saving: ', error)
    return NextResponse.json({ Message: 'Failed', status: 500 })
  }
}
