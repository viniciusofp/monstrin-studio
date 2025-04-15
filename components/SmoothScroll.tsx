// SmoothScroll.tsx
'use client'

import Lenis from 'lenis'
import {useEffect} from 'react'
import 'lenis/dist/lenis.css'

export default function SmoothScroll({children}: {children: React.ReactNode}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => t,
      smoothWheel: true,
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
