'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const stored = localStorage.getItem('perseia-theme') as Theme | null
    if (stored === 'dark') {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    }
  }, [])

  function toggle() {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', next === 'dark')
    localStorage.setItem('perseia-theme', next)
    setTheme(next)
  }

  return (
    <button
      aria-label={theme === 'light' ? 'Przełącz na tryb ciemny' : 'Przełącz na tryb jasny'}
      className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted/50 hover:text-foreground"
      onClick={toggle}
    >
      {theme === 'light' ? (
        <Moon className="size-[1.1rem]" />
      ) : (
        <Sun className="size-[1.1rem]" />
      )}
    </button>
  )
}
