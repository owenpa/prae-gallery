'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Your name must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Invalid email address.'
  }),
  content: z.string()
})

export default function CommissionView ({ imageNameList }: { imageNameList: string[] }): JSX.Element {
  const imageList = imageNameList.map((imageName, idx) => {
    return (
      <div key={idx} className={`commission-transition w-full h-full absolute flex justify-center ${idx === 0 ? '' : 'fadeout'}`}>
        <Image fill={true} className='object-contain' src={`/assets/gallery/${imageName}`} alt={`image in gallery #${idx}`} />
      </div>
    )
  })

  let index = 0
  function changeDisplayedImage (): void {
    const images = document.getElementById('image-post-container')?.children
    if (images === undefined) {
      return
    }
    for (let imgIdx = 0; imgIdx < images.length; imgIdx++) {
      images[imgIdx].classList.add('fadeout')
    }
    index = ++index > images.length ? 1 : index
    images[index - 1].classList.remove('fadeout')
    setTimeout(changeDisplayedImage, 7000)
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      content: ''
    }
  })

  function onSubmitHandler (data: z.infer<typeof FormSchema>): void {
    // email

    console.log(data)
    alert(data)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => changeDisplayedImage, [])
  return (
    <div className='flex w-full h-screen'>
      <div id='image-post-container' className='flex w-3/4 items-center justify-center relative'>
      {imageList.length > 1 ? imageList : <p>No images to display.</p>}
      </div>
      <div className='flex h-full w-1/4 items-center'>
      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit(onSubmitHandler)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='text' placeholder="Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' placeholder="Email@example.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description / Request</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        <Button onSubmit={(e) => { e.preventDefault() }} type="submit">Submit</Button>
      </form>
      </Form>
      </div>
    </div>
  )
}
