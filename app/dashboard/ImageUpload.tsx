'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../ui/popover'

export default function ImageUpload (): JSX.Element {
  const [fileName, setFileName] = useState<string>('')
  const [date, setDate] = useState<Date>()

  async function handleFormUpload (submitEvent: FormEvent): Promise<void> {
    submitEvent.preventDefault()
    if (date !== undefined) {
      const htmlFormAsObj = {
        fileName,
        title: (document.getElementById('title') as HTMLInputElement).value,
        price: (document.getElementById('price') as HTMLInputElement).value,
        description: (document.getElementById('description') as HTMLInputElement).value,
        footer: (document.getElementById('footer') as HTMLInputElement).value,
        date: format(date, 'MM/dd/yyyy')
      }
      if (htmlFormAsObj.price !== null) htmlFormAsObj.price = parseFloat(htmlFormAsObj.price).toFixed(2)
      const URLParams = new URLSearchParams(htmlFormAsObj)
      const fileFormData = new FormData((submitEvent.target as HTMLFormElement))
      await fetch(`api/upload?${URLParams.toString()}`, {
        method: 'POST',
        body: fileFormData
      })
    }
  }

  function handleImagePreview (uploadEvent: ChangeEvent): void {
    const uploadedFile = (uploadEvent.target as HTMLInputElement).files?.[0]
    const imgPreview = document.getElementById('image-preview') as HTMLImageElement
    const fileReader = new FileReader()
    if (uploadedFile !== null && uploadedFile !== undefined) {
      fileReader.readAsDataURL(uploadedFile)
      setFileName(uploadedFile.name)
    }
    fileReader.onload = function () {
      if (imgPreview == null || typeof fileReader.result !== 'string') return
      imgPreview.hidden = false
      imgPreview.src = fileReader.result
    }
  }

  return (
    <>
      <form className='flex flex-col w-96' id="image-upload-form" onSubmit={(submitEvent) => { handleFormUpload(submitEvent).catch((error) => { console.error(error) }) }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img hidden={true} src="" alt="Image Preview" className="image-preview" id="image-preview"></img>
        <input onChange={(uploadEvent) => { handleImagePreview(uploadEvent) }} type="file" id="file" name="file" accept="image/*" />
        <label htmlFor='title'>Title</label>
        <input id='title' className='title' type='text'/>
        <label htmlFor="price">Price</label>
        <input id="price" className="price" type="number" required max="1000000000"/>
        <label htmlFor="description">Description</label>
        <input id="description" className="description" type="text"/>
        <label htmlFor="footer">Footer</label>
        <input id="footer" className="footer" type="text"/>
        <br></br>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'MM/dd/yyyy') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <input type="submit" />
      </form>
    </>
  )
}
