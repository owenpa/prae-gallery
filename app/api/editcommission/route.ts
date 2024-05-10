import { editCommissionPage } from '@/actions'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST (req: NextRequest):
Promise<NextResponse<{ error: string }> | NextResponse<{ Message: string, status: number }>> {
  try {
    if (req.body === null) throw new Error('Body is null')
    const editedCommissions = await req.formData()
    await editCommissionPage(editedCommissions)
    return NextResponse.json({ Message: 'Success', status: 201 })
  } catch (error) {
    console.error('Error occurred while editing commissions page: ', error)
    return NextResponse.json({ Message: 'Failed', status: 500 })
  }
}
