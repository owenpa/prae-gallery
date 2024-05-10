import { addShareViewToImage } from '@/actions'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST (req: NextRequest): Promise<NextResponse<{ error: string }> | NextResponse<{ Message: string, status: number }>> {
  try {
    const imageName: string = await req.json()
    await addShareViewToImage(imageName)
    return NextResponse.json({ Message: 'Success', status: 201 })
  } catch (error) {
    console.error('Error occurred while adding a share to an image: ', error)
    return NextResponse.json({ Message: 'Failed', status: 500 })
  }
}
