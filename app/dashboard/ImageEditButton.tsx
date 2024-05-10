'use client'

import { SquarePen } from 'lucide-react'

export default function ImageEditButton ({ imageID, imageName, imageTitle, price, description, descriptionfooter, date }: { imageID: number, imageName: string, imageTitle: string, price: string, description: string, descriptionfooter: string, date: string }): JSX.Element {
  function openModal (): void {
    const confirmationModal = document.getElementById('edit-modal');
    (confirmationModal as HTMLDialogElement).showModal()
    const displayImageName = document.getElementById('edit-display-image-name')
    const prevImageTitle = document.getElementById('image-title')
    const prevImagePrice = document.getElementById('image-price')
    const prevImageDesc = document.getElementById('image-description')
    const prevImageFooter = document.getElementById('image-footer')
    const prevImageDate = document.getElementById('image-date')
    const confirmEditButton = document.getElementById('confirm-edit')
    if (displayImageName !== null) {
      displayImageName.innerText = imageName
    }
    if (prevImageTitle !== null) {
      (prevImageTitle as HTMLInputElement).value = imageTitle;
      (confirmEditButton as HTMLButtonElement).value = imageName;
      (prevImagePrice as HTMLInputElement).value = price;
      (prevImageDesc as HTMLTextAreaElement).value = description;
      (prevImageFooter as HTMLInputElement).value = descriptionfooter
      const splitDate = date.split('/');
      (prevImageDate as HTMLDataElement).value = `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`
    }
  }

  return (
    <>
      <button id={`button-${imageName}`} onClick={() => { openModal() }}>
        <SquarePen className='hover:stroke-gray-300 w-10'/>
      </button>
    </>
  )
}
