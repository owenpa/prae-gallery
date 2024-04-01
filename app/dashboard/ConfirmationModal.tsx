'use client'

import { useFormState } from 'react-dom'
import { deleteImageInfoFromDb } from '../../actions'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { useState } from 'react'

export default function ConfirmationModal (): JSX.Element {
  const [errorMessage, fireDeleteImage] = useFormState(deleteImageInfoFromDb, undefined)
  const router = useRouter()
  const [canSubmit, setCanSubmit] = useState(false)

  if (errorMessage !== undefined) {
    console.log(errorMessage)
    router.refresh()
    const confirmationModal = document.getElementById('confirmation-modal');
    (confirmationModal as HTMLDialogElement).close()
  }

  return (
    <dialog id='confirmation-modal'>
      <div className='border px-4 py-6 rounded-lg tracking-wide max-h-[300px] max-w-xl gap-2'>
        <div className='flex items-center justify-between'>
          <h1 id="display-image-name" className="text-xl font-semibold inline"></h1>
          <button onClick={() => { (document.getElementById('confirmation-modal') as HTMLDialogElement).close() }}><X className='self-end justify-self-end'/></button>
        </div>
        <form action={fireDeleteImage} className='gap-2 flex flex-col'>
          <label htmlFor="image-name">Are you sure you want to delete this image? Re-enter the filename to proceed.</label>
          <div className='flex gap-2'>
            <Input required name="image-name" id="image-name" onInput={(e) => { (e.target as HTMLInputElement).value === document.getElementById('display-image-name')?.innerText ? setCanSubmit(true) : setCanSubmit(false) }}></Input>
            <Button variant={'ghost'} id="submit-delete" className={`${canSubmit ? 'bg-red-500 hover:bg-red-700' : ''} text-white max-w-28`} type="submit">Delete</Button>
          </div>
          </form>
        </div>
      </dialog>
  )
}
