'use client'

import { useFormState } from 'react-dom'
import { editImageInfoInDb } from '../../actions'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { Textarea } from '../ui/textarea'

export default function EditModal (): JSX.Element {
  const [errorMessage, fireEditImage] = useFormState(editImageInfoInDb, undefined)
  const router = useRouter()

  if (errorMessage !== undefined) {
    console.log(errorMessage)
    router.refresh()
    const confirmationModal = document.getElementById('delete-confirmation-modal');
    (confirmationModal as HTMLDialogElement).close()
  }

  return (
    <dialog className='max-w-xl w-full' id='edit-modal'>
      <div className='border px-4 py-6 rounded-lg tracking-wide gap-2'>
        <div className='flex items-center justify-between'>
          <h1 id="edit-display-image-name" className="text-xl font-semibold inline"></h1>
          <button onClick={() => { (document.getElementById('edit-modal') as HTMLDialogElement).close() }}><X className='self-end justify-self-end'/></button>
        </div>
        <form action={fireEditImage} className='gap-2 flex flex-col'>
          <label htmlFor="image-title">Title</label>
          <Input required name="image-title" id="image-title"></Input>
          <label htmlFor='image-price'>Price</label>
          <Input required name='image-price' type='number' max='1000000000' id='image-price'></Input>
          <label htmlFor='image-description'>Description</label>
          <Textarea id="image-description" name="image-description"/>
          <label htmlFor='image-footer'>Footer</label>
          <Input required name='image-footer' id='image-footer'></Input>
          <label htmlFor='image-date'>Date of creation</label>
          <Input required name='image-date' className='image-date' id='image-date' type='date'></Input>
          <Button variant={'ghost'} id="confirm-edit" name='image-name' className='hover:bg-[#facc15] hover:text-black' type="submit" >Confirm</Button>
        </form>
      </div>
    </dialog>
  )
}
