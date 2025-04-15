'use client'

import {motion, useScroll, useTransform} from 'motion/react'
import {useRef} from 'react'

export type HelloWorldProps = {}

export default function HelloWorld(props: HelloWorldProps) {
  const helloWorld = useRef(null)
  const {scrollYProgress} = useScroll({
    target: helloWorld,
    offset: ['end 0.58', 'end 0.7'],
  })
  const {scrollYProgress: progress2} = useScroll({
    target: helloWorld,
    offset: ['start center', 'start start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 100], [0, 1])
  return (
    <section
      ref={helloWorld}
      className="relative z-2 bg-black text-white min-h-[100dvh] grid lg:flex gap-8 px-32"
    >
      <motion.h1
        className="py-12 lg:sticky top-1/2 -translate-y-1/2 basis-1/3 font-extrabold text-6xl h-min"
        style={{opacity: opacity.get() === 1 ? opacity : scrollYProgress, scale: progress2}}
      >
        salve, salve!
      </motion.h1>
      <div className="basis-2/3 grid gap-16 justify-center py-12 lg:py-32">
        <p className="leading-relaxed max-w-prose text-xl lg:text-3xl self-center">
          Oi! Meu nome é Jay (pode falar Jái ou Jêi, tanto faz) e eu gosto de usar a animação pra
          explicar coisas. Tenho mais de 10 anos no universo da comunicação e já passei por diversas
          áreas, como design, ilustração e edição de vídeos. Decidi juntar tudo isso e, atualmente,
          trabalho com motion design e animação 2D.
        </p>
      </div>
    </section>
  )
}
