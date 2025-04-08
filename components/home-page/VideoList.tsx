'use client'

import {AnimatePresence, motion} from 'motion/react'
import {useMemo, useRef} from 'react'
import {useWindowSize} from 'usehooks-ts'

export type VideoListProps = {
  videos: {_id: number; title: string; coverImage: string; video: string}[]
  current: number
  currentTime: number
  currentVideoTime: number
  setMouseIsOverList: (v: boolean) => void
  delay: number
  isMobile: boolean
}

export default function VideoList({
  videos,
  current,
  currentTime,
  currentVideoTime,
  setMouseIsOverList,
  delay,
  isMobile,
}: VideoListProps) {
  const windowSize = useWindowSize()
  const videoListRef = useRef<HTMLDivElement | null>(null)

  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])
  const totalDuration = useMemo(() => videos.length * delay, [videos, delay])

  const xOffset = useMemo(() => {
    if (videoListRef.current) {
      const elapsedPercentage = currentTime / totalDuration

      return windowSize.width / 2 - elapsedPercentage * videoListRef.current.offsetWidth
    } else {
      return 0
    }
  }, [windowSize, currentTime])

  const getAffectedIndexes = useMemo((): number[] => {
    if (current === 0) return [videos.length - 2, videos.length - 1]
    if (current === 1) return [videos.length - 1]
    if (current === videos.length - 2) return [0]
    if (current === videos.length - 1) return [0, 1]
    return []
  }, [current])
  return (
    <div
      ref={videoListRef}
      className="bottom-5 absolute md:left-1/2 md:-translate-x-1/2 flex z-[3] md:hover:px-5 md:transition-all md:duration-500 select-none [&>*]:select-none"
      onMouseEnter={() => setMouseIsOverList(true)}
      onMouseLeave={() => setMouseIsOverList(false)}
      style={isMobile ? {transform: `translateX(${xOffset}px)` || ''} : {}}
    >
      {videos.map((video, index) => {
        const shouldApply = isMobile && getAffectedIndexes.includes(index)
        return (
          <div
            key={video._id + '_video'}
            className="relative touch-none focus:outline-none"
            style={
              shouldApply && !!videoListRef.current
                ? {
                    transform: `translateX(${
                      Math.sign(2 - index) * videoListRef.current?.offsetWidth || ''
                    }px)`,
                  }
                : {}
            }
          >
            <AnimatePresence>
              {index === current && (
                <motion.div
                  initial={{opacity: 0, y: '150%'}}
                  animate={{opacity: 1, y: '-100%'}}
                  exit={{opacity: 0, y: '150%'}}
                  transition={{duration: 0.3, ease: 'easeIn'}}
                  className="absolute w-full -top-1 left-0 -translate-y-full pointer-events-none text-white font-mono text-[9px] uppercase flex justify-between"
                >
                  <div className="flex gap-3">
                    <p>0{index + 1}</p>
                    <p>{video.title}</p>
                  </div>
                  <p>
                    00:
                    {Math.floor((currentVideoTime + 500) / 1000) < 10 && '0'}
                    {Math.floor((currentVideoTime + 500) / 1000)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Time Indicator */}
            <div
              className="absolute top-1/2 -translate-y-[calc(50%+3px)] right-0 pointer-events-none transition duration-[1] h-full border-l-2 z-[5] border-white w-full"
              style={
                index === current
                  ? {
                      width: `${100 - (currentVideoTime * 100) / delay}%`,
                    }
                  : {border: 'none'}
              }
            ></div>

            {/* Button */}
            <button
              ref={(el) => (thumbRefs.current[index] = el!) as any}
              className={`w-[calc(16/36*100vw)] h-[calc(9/36*100vw)] sm:w-[calc(16/64*100vw)] sm:h-[calc(9/64*100vw)] md:w-[calc(367/1920*100vw)] md:h-[calc(196/1920*100vw)] relative transition-[padding,margin] border-amber-300 duration-500 ease-out overflow-hidden group hover:p-3 mx-0.5 hover:mx-2 cursor-none ${
                current === index && 'border-2'
              }`}
            >
              {/* Corners */}
              <div className="absolute top-1 left-1 border-t-[0.75px] border-l-[0.75px] h-0 w-0 border-transparent z-[3] group-hover:w-4 group-hover:h-4 group-active:w-4 group-active:h-4 group-active:border-white transition-normal duration-500 ease-out group-hover:border-white"></div>
              <div className="absolute top-1 right-1 border-t-[0.75px] border-r-[0.75px] h-0 w-0 border-transparent z-[3] group-hover:w-4 group-hover:h-4 group-active:w-4 group-active:h-4 group-active:border-white transition-normal duration-500 ease-out group-hover:border-white"></div>
              <div className="absolute bottom-1 left-1 border-b-[0.75px] border-l-[0.75px] h-0 w-0 border-transparent z-[3] group-hover:w-4 group-hover:h-4 group-active:w-4 group-active:h-4 group-active:border-white transition-normal duration-500 ease-out group-hover:border-white"></div>
              <div className="absolute bottom-1 right-1 border-b-[0.75px] border-r-[0.75px] h-0 w-0 border-transparent z-[3] group-hover:w-4 group-hover:h-4 group-active:w-4 group-active:h-4 group-active:border-white transition-normal duration-500 ease-out group-hover:border-white"></div>
              {/* Backdrop Blur */}
              <div
                className="absolute top-0 right-0 transition duration-[1] h-full backdrop-blur-sm z-[3] w-full group-hover:backdrop-blur-none opacity-50 brightness-110"
                style={
                  index === current
                    ? {
                        width: `${100 - (currentVideoTime * 100) / delay}%`,
                      }
                    : {border: 'none'}
                }
              ></div>

              {/* Image */}
              <div className="w-full h-full relative">
                <img
                  width="500"
                  height="500"
                  src={video.coverImage}
                  alt={video.title}
                  className="w-full h-full object-cover object-center pointer-events-none"
                />
              </div>
            </button>
          </div>
        )
      })}
    </div>
  )
}
