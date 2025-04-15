'use client'

import {Pause, Play, SquareArrowUpRight} from 'lucide-react'
import {AnimatePresence, motion} from 'motion/react'
import {useEffect, useState} from 'react'

type MouseFollowerProps = {
  isPlaying: boolean
  mouseIsOverList: boolean
  currentVideoTime: number
  isMobile: boolean
}

export default function MouseFollower({
  isPlaying,
  mouseIsOverList,
  currentVideoTime,
  isMobile,
}: MouseFollowerProps) {
  const [position, setPosition] = useState({x: 0, y: 0})

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setPosition({x: e.clientX, y: e.clientY})
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {mouseIsOverList && !isMobile && (
        <div
          className="absolute md:fixed left-1/2 -translate-x-1/2 bottom-44 md:-translate-1/2 pointer-events-none bg-black/80 rounded-full w-16 h-16 flex items-center justify-center z-[9999]"
          style={
            !isMobile
              ? {
                  left: position.x,
                  top: position.y,
                }
              : {}
          }
        >
          <AnimatePresence>
            <motion.div
              initial={{scale: 0, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              exit={{opacity: 0}}
              className="text-white text-[8px] uppercase font-mono text-center leading-normal"
            >
              <div className="grid gap-0.5">
                <SquareArrowUpRight className="size-4 mx-auto" />
                Abrir
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      {(!mouseIsOverList || isMobile) && isPlaying && (
        <div
          className="absolute md:fixed left-1/2 -translate-x-1/2 bottom-44 md:-translate-1/2 pointer-events-none bg-black/30 rounded-full w-16 h-16 flex items-center justify-center z-[9999]"
          style={
            !isMobile
              ? {
                  left: position.x,
                  top: position.y,
                }
              : {}
          }
        >
          <AnimatePresence>
            <motion.div
              initial={{scale: 0, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              exit={{opacity: 0}}
              className="text-white text-[8px] uppercase font-mono text-center leading-normal"
            >
              <div className="grid gap-0.5">
                Parar
                <Pause className="size-4 mx-auto fill-white" />
                <span>
                  00:{Math.floor((currentVideoTime + 500) / 1000) < 10 && '0'}
                  {Math.floor((currentVideoTime + 500) / 1000)}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      {(!mouseIsOverList || isMobile) && !isPlaying && (
        <div
          className="absolute md:fixed left-1/2 -translate-x-1/2 bottom-44 md:-translate-1/2 pointer-events-none bg-black/80 rounded-full w-16 h-16 flex items-center justify-center z-[9999]"
          style={
            !isMobile
              ? {
                  left: position.x,
                  top: position.y,
                }
              : {}
          }
        >
          <AnimatePresence>
            <motion.div
              initial={{scale: 0, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              exit={{opacity: 0}}
              className="text-white text-[8px] uppercase font-mono text-center leading-normal"
            >
              <div className="grid gap-0.5">
                Tocar
                <Play className="size-4 mx-auto fill-white" />
                <span>
                  00:{Math.floor((currentVideoTime + 500) / 1000) < 10 && '0'}
                  {Math.floor((currentVideoTime + 500) / 1000)}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  )
}
