import ImageUpload from './ImageUpload'
import DBImageControl from './DBImageControl'
export default function ControlPanel (): JSX.Element {
  return (
    <div>
      <ImageUpload/>
      <DBImageControl/>
    </div>
  )
}
