'use client'

import { useState, type ChangeEvent, type FormEvent, useRef } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../../ui/button'
import { Calendar } from '../../ui/calendar'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Textarea } from '../../ui/textarea'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../../ui/popover'
import { useRouter } from 'next/navigation'
import { type vgyResponse } from '@/types/types'

export default function ImageUpload (): JSX.Element {
  const [fileName, setFileName] = useState<string>('')
  const [date, setDate] = useState<Date>()
  const router = useRouter()
  const inputFileRef = useRef<HTMLInputElement>(null)
  async function handleFormUpload (submitEvent: FormEvent): Promise<void> {
    submitEvent.preventDefault()
    if (date === undefined) return
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (inputFileRef.current === null || inputFileRef.current.files === null) return

    const file = inputFileRef.current.files[0]
    const imageFormData = new FormData()
    imageFormData.append('file', file)
    if (process.env.REACT_APP_VGY_KEY === undefined) { return } // TODO
    imageFormData.append('userkey', process.env.REACT_APP_VGY_KEY)
    const vgyUploadResponse = await fetch('https://vgy.me/upload', { method: 'POST', body: imageFormData })

    const vgyUploadResponseAsObj: vgyResponse = await vgyUploadResponse.json()
    if (vgyUploadResponseAsObj.error) {
      router.refresh()
      return
    }

    const htmlFormAsObj = {
      fileName,
      title: (document.getElementById('title') as HTMLInputElement).value,
      price: (document.getElementById('price') as HTMLInputElement).value,
      description: (document.getElementById('description') as HTMLInputElement).value,
      footer: (document.getElementById('footer') as HTMLInputElement).value,
      date: format(date, 'MM/dd/yyyy'),
      imageurl: vgyUploadResponseAsObj.image
    }

    if (htmlFormAsObj.price !== null) htmlFormAsObj.price = parseFloat(htmlFormAsObj.price).toFixed(2)
    const URLParams = new URLSearchParams(htmlFormAsObj)

    const dbUploadResponse = await fetch(`/api/upload?${URLParams.toString()}`, { method: 'POST' })

    if (dbUploadResponse.status === 200) {
      router.push('/dashboard', { scroll: true })
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
    <div className='flex items-center justify-center h-[90vh]'>
      <form className='flex flex-col max-w-[500px] gap-2 items-center' id="image-upload-form" onSubmit={(submitEvent) => { handleFormUpload(submitEvent).catch((error) => { console.error(error) }) }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img hidden={true} src="" alt="Image Preview" className="image-preview" id="image-preview"></img>
        <label className="w-64 flex flex-col items-center px-4 py-6 rounded-lg tracking-wide border cursor-pointer">
          <Upload />
          <span className="mt-2 text-base leading-normal">Upload an image</span>
          <input ref={inputFileRef} onChange={(uploadEvent) => { handleImagePreview(uploadEvent) }} type="file" id="file" name="file" accept="image/*" className="hidden" />
        </label>
        {fileName !== '' &&
          <>
            <Label className='self-start' htmlFor='title'>Title</Label>
            <Input id='title' className='title' type='text'/>
            <Label className='self-start' htmlFor="price">Price</Label>
            <Input id="price" className="price" type="number" required max="1000000000"/>
            <Label className='self-start' htmlFor="description">Description</Label>
            <Textarea id="description" className="description"/>
            <Label className='self-start' htmlFor="footer">Footer</Label>
            <Input id="footer" className="footer" type="text"/>
            <Label className='self-start'>Date of creation</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    date === undefined && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date !== undefined ? format(date, 'MM/dd/yyyy') : <span>Pick a date</span>}
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
            <div>
            <Button className='m-2 mt-0' type='submit'>Submit</Button>
            <Button onClick={() => { setDate(undefined) }} className=' bg-red-500 hover:bg-red-700 text-white' type='reset'>Clear Values</Button>
            </div>
          </>
        }
      </form>
    </div>
  )
}
