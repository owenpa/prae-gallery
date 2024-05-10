import { fetchCommissionInformation } from '@/actions'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET (req: NextRequest):
Promise<NextResponse<{ error: string }> | NextResponse<{ Message: string, status: number }>> {
  try {
    const commissionInfo = await fetchCommissionInformation()
    return NextResponse.json({ Message: commissionInfo as unknown as string, status: 201 })
  } catch (error) {
    console.error('Error occurred while fetching commissions page: ', error)
    return NextResponse.json({ Message: 'Failed', status: 500 })
  }
}
