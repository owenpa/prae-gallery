import { type NextRequest, NextResponse } from 'next/server'
import { fetchAnalytics } from '../../../actions'

export async function GET (req: NextRequest):
Promise<NextResponse<{ error: string }> | NextResponse<{ Message: string, status: number }>> {
  try {
    const analytics = await fetchAnalytics()
    return NextResponse.json({ Message: JSON.stringify(analytics), status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ Message: 'Failed', status: 500 })
  }
}
