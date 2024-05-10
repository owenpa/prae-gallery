'use server'

import AnalyticsBar from '../ui/AnalyticsBar'
import { fetchAnalytics } from '@/actions'

export default async function PreviewAnalytics (): Promise<JSX.Element> {
  const data = await fetchAnalytics()

  return (
    <div className='p-2 w-full flex flex-col text-center items-center'>
      <AnalyticsBar data={data} toggleable={true} />
    </div>
  )
}
