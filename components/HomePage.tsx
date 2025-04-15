'use client'

import type {HomePageQueryResult} from '@/sanity.types'
import {studioUrl} from '@/sanity/lib/api'
import {urlForImage} from '@/sanity/lib/utils'
import {motion, useScroll, useSpring, useTransform} from 'motion/react'
import {createDataAttribute} from 'next-sanity'
import {useEffect, useRef} from 'react'
import VideoHero from './home-page/VideoHero'
import 'lenis/dist/lenis.css'
import {ReactLenis, useLenis} from 'lenis/react'
import HelloWorld from './home-page/HelloWorld'
import SmoothScroll from './SmoothScroll'

export interface HomePageProps {
  data: HomePageQueryResult | null
}

export function HomePage({data}: HomePageProps) {
  const wrapper = useRef(null)

  // Default to an empty object to allow previews on non-existent documents
  const {overview = [], showcaseProjects = [], title = ''} = data ?? {}

  // useEffect(() => {
  //   const lenis = new Lenis()

  //   const raf = (time) => {
  //     lenis.raf(time)

  //     requestAnimationFrame(raf)
  //   }

  //   requestAnimationFrame(raf)
  // }, [])

  const dataAttribute =
    data?._id && data?._type
      ? createDataAttribute({
          baseUrl: studioUrl,
          id: data._id,
          type: data._type,
        })
      : null

  const videos = data?.showcaseProjects?.map((project) => {
    const imageUrl =
      project.coverImage &&
      urlForImage(project.coverImage as any)
        ?.height(405)
        .width(720)
        .url()

    return {
      _id: project._id,
      title: project.title,
      coverImage: imageUrl,
      video: project.videos![0].videoUrl,
    }
  })

  return (
    <ReactLenis root className="">
      <section className="sticky top-0 h-screen w-full flex items-center justify-center bg-gray-900 text-white">
        <h1 className="font-extrabold text-8xl">monstrin studio</h1>
      </section>
      <HelloWorld />
      <div className="h-[200svh]">
        <motion.section className=" snap-start sticky top-0 z-0 h-screen w-full bg-purple-500 flex items-center justify-center text-white text-4xl">
          <VideoHero videos={videos} />
        </motion.section>
      </div>
    </ReactLenis>
  )
}
