import ImageUpload from './ImageUpload'
import DBImageControl from './DBImageControl'
import PreviewAnalytics from './PreviewAnalytics'
export default function ControlPanel (): JSX.Element {
  return (
    <div className='flex flex-col items-center'>
      <ImageUpload/>
      <DBImageControl/>
      <PreviewAnalytics />
    </div>
  )
}
