'use client'

import type { ChangeEvent } from 'react'
import { useFormState } from 'react-dom'
import { deleteImageInfoFromDb } from '../../actions'

export default function ConfirmationModal (): JSX.Element {
  const submitButtonColors = { red: 'bg-red-500 hover:bg-red-700 text-white p-3', green: 'bg-green-500 text-white hover:bg-green-700 p-3' }
  const [errorMessage, fireDeleteImage] = useFormState(deleteImageInfoFromDb, undefined)
  if (errorMessage !== undefined) {
    console.log(errorMessage)
  }
  function imageNameOnChange (onChangeEvent: ChangeEvent<HTMLInputElement>): number {
    const submitButton = document.getElementById('submit-delete')
    const imageName = document.getElementById('display-image-name')?.innerText
    if (onChangeEvent.target.value !== imageName) {
      if (submitButton !== null) {
        submitButton.className = submitButtonColors.red
      }
      return 0
    }
    if (submitButton !== null) {
      submitButton.className = submitButtonColors.green
    }
    return 0
  }

  return (
    <dialog id='confirmation-modal'>
        <h1 id="display-image-name" className="text-xl"></h1>
        <form action={fireDeleteImage}>
          <label htmlFor="image-name">Are you sure you want to delete this image? Re-enter the filename to proceed.</label>
          <input required name="image-name" id="image-name" onChange={(onChangeEvent) => { imageNameOnChange(onChangeEvent) }} className="bg-slate-700"></input>
          <button id="submit-delete" className="bg-red-500 text-white p-3" type="submit">Submit</button>
        </form>
      </dialog>
  )
}
