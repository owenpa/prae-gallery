'use client'

export default function ImageDeleteButton ({ parentFileName }: { parentFileName: string }): JSX.Element {
  function openModal (): void {
    const confirmationModal = document.getElementById('confirmation-modal');
    (confirmationModal as HTMLDialogElement).showModal()
    const displayImageName = document.getElementById('display-image-name')
    if (displayImageName !== null) {
      displayImageName.innerText = parentFileName
    }
  }

  return (
    <>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" id={parentFileName} onClick={() => { openModal() }}>
        Delete
      </button>
    </>
  )
}
