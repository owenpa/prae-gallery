import ImageUpload from './ImageUpload'
import DBImageControl from './DBImageControl'
import { Button } from '../ui/button'
import { signOut } from '../../auth'
export default function ControlPanel (): JSX.Element {
  return (
    <div>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form action={async (): Promise<void> => {
          'use server'
          await signOut()
        }}>
          <Button> Sign Out</Button>
        </form>
      <ImageUpload/>
      <DBImageControl/>
    </div>
  )
}
