'use client'

import { useFormState } from 'react-dom'
import { deleteImageInfoFromDb } from '../../actions'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export default function ConfirmationModal (): JSX.Element {
  const [errorMessage, fireDeleteImage] = useFormState(deleteImageInfoFromDb, undefined)
  if (errorMessage !== undefined) {
    console.log(errorMessage)
  }

  return (
    <dialog id='confirmation-modal'>
      <div className='border flex px-4 py-6 rounded-lg tracking-wide border cursor-pointer max-h-[300px] max-w-xl gap-2'>
        <h1 id="display-image-name" className="text-xl"></h1>
        <form action={fireDeleteImage} className='gap-2 flex flex-col'>
          <label htmlFor="image-name">Are you sure you want to delete this image? Re-enter the filename to proceed.</label>
          <Input required name="image-name" id="image-name"></Input>
          <Button id="submit-delete" className="bg-red-500 hover:bg-red-700 text-white max-w-28" type="submit">Submit</Button>
        </form>
        </div>
      </dialog>
  )
}
