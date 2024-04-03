'use client'

import { X } from 'lucide-react'

export default function ImageDeleteButton ({ parentFileName }: { parentFileName: string }): JSX.Element {
  function openModal (): void {
    const confirmationModal = document.getElementById('delete-confirmation-modal');
    (confirmationModal as HTMLDialogElement).showModal()
    const displayImageName = document.getElementById('delete-display-image-name')
    if (displayImageName !== null) {
      displayImageName.innerText = parentFileName
    }
  }

  return (
    <>
      <button id={`button-${parentFileName}`} onClick={() => { openModal() }}>
        <X className="hover:stroke-red-500 w-10"></X>
      </button>
    </>
  )
}
