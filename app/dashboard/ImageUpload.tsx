'use client'

import type { ChangeEvent, FormEvent } from 'react'

export default function ImageUpload (): JSX.Element {
  let uploadedFileName: string
  async function handleFormUpload (submitEvent: FormEvent): Promise<void> {
    const htmlFormAsObj = {
      fileName: uploadedFileName,
      price: (document.getElementById('price') as HTMLInputElement).value,
      description: (document.getElementById('description') as HTMLInputElement).value
    }

    if (htmlFormAsObj.price !== null) htmlFormAsObj.price = parseFloat(htmlFormAsObj.price).toFixed(2)
    const URLParams = new URLSearchParams(htmlFormAsObj)
    const fileFormData = new FormData((submitEvent.target as HTMLFormElement))
    submitEvent.preventDefault()

    await fetch(`api/upload?${URLParams.toString()}`, {
      method: 'POST',
      body: fileFormData
    })
  }

  function handleImagePreview (uploadEvent: ChangeEvent): void {
    const uploadedFile = (uploadEvent.target as HTMLInputElement).files?.[0]
    const imgPreview = document.getElementById('image-preview') as HTMLImageElement
    const fileReader = new FileReader()
    if (uploadedFile !== null && uploadedFile !== undefined) {
      fileReader.readAsDataURL(uploadedFile)
      uploadedFileName = uploadedFile.name
    }
    fileReader.onload = function () {
      if (imgPreview == null || typeof fileReader.result !== 'string') return
      imgPreview.hidden = false
      imgPreview.src = fileReader.result
    }
  }

  return (
    <>
      <form id="image-upload-form" onSubmit={(submitEvent) => { handleFormUpload(submitEvent).catch((error) => { console.error(error) }) }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img hidden={true} src="" alt="Image Preview" className="image-preview" id="image-preview"></img>
        <input onChange={(uploadEvent) => { handleImagePreview(uploadEvent) }} type="file" id="file" name="file" accept="image/*" />
        <input type="submit" />
        <label htmlFor="price">Price</label>
        <input id="price" className="price" type="number" data-index="2" max="1000000000"/>
        <label htmlFor="description">Description</label>
        <input id="description" className="description" type="text"/>
      </form>
    </>
  )
}
