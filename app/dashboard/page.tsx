import ImageUpload from './ImageUpload'
import DBImageControl from './DBImageControl'
import PreviewAnalytics from './PreviewAnalytics'
import { Button } from '../ui/button'
import { signOut } from '../../auth'
export default function ControlPanel (): JSX.Element {
  return (
    <div className='flex flex-col items-center'>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className='text-right self-end' action={async (): Promise<void> => {
          'use server'
          await signOut()
        }}>
          <Button>Sign Out</Button>
        </form>
      <ImageUpload/>
      <DBImageControl/>
      <PreviewAnalytics />
    </div>
  )
}
