'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from './button'
import { useEffect, useState } from 'react'

export default function ToggleTheme (): JSX.Element {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const dark = theme === 'dark'

  useEffect(() => { setMounted(true) })
  if (!mounted) {
    return <Button variant='ghost' size='icon' disabled={true}/>
  }

  return (
    <Button variant='ghost' size='icon' onClick={() => { setTheme(`${dark ? 'light' : 'dark'}`) }}>
      {dark ? (<Sun />) : (<Moon />)}
    </Button>
  )
}
