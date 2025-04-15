'use client'

import {cn} from '@/lib/utils'
import {AnimatePresence, motion} from 'motion/react'
import {useEffect, useMemo, useRef, useState} from 'react'
import ReactPlayer from 'react-player'
import {useMediaQuery} from 'usehooks-ts'
import MouseFollower from './MouseFollower'
import VideoList from './VideoList'

const delay = 7000

type VideoHeroProps = {
  videos
}

export default function VideoHero({videos}: VideoHeroProps) {
  const isMobile = useMediaQuery('(max-width: 48rem')

  const [showMouseFollower, setShowMouseFollower] = useState(false)

  const [mouseIsOverList, setMouseIsOverList] = useState(false)
  const [play, setPlay] = useState(false)
  const [wasPlaying, setWasPlaying] = useState(false)

  const [value, setValue] = useState(0)
  const valueRef = useRef(0)
  const playRef = useRef(play)
  const lastTimeRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const [ready, setReady] = useState({})
  const readyRef = useRef(ready)

  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    if (ready) setPlay(play)
  }, [ready])

  useEffect(() => {
    playRef.current = play
  }, [play])
  useEffect(() => {
    readyRef.current = ready
  }, [ready])

  useEffect(() => {
    let frameId: number

    const loop = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now
      if (!lastTimeRef.current) lastTimeRef.current = now

      if (playRef.current) {
        const elapsed = Math.abs(now - startTimeRef.current)
        const totalDuration = delay * videos.length

        const loopedTime = elapsed % totalDuration
        valueRef.current = loopedTime
        setValue(Math.floor(loopedTime))
      } else {
        // pause: adjust startTime so that when resuming it continues from the same point
        startTimeRef.current += now - lastTimeRef.current
      }

      lastTimeRef.current = now
      frameId = requestAnimationFrame(loop)
    }

    frameId = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(frameId)
  }, [])

  const current = useMemo(() => {
    return Math.abs(Math.floor(value / delay) % videos.length)
  }, [value, delay])

  useEffect(() => {
    if (!dragging.current) videoRefs.current[current]?.seekTo(0)
  }, [current])

  const currentVideoTime = useMemo(() => {
    return Math.floor(Math.abs(value - current * delay))
  }, [value, current])

  const dragging = useRef(false)
  const referenceX = useRef(0)
  const startX = useRef(0)
  const videoRefs = useRef<(ReactPlayer | null)[]>([])

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    referenceX.current = e.clientX
    startX.current = e.clientX
    setWasPlaying(play)
    setPlay(false)
    playRef.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return

    const deltaX = e.clientX - referenceX.current

    if (Math.abs(deltaX) > 5) {
      let exponentialMultiplier = 1 + Math.abs(referenceX.current - startX.current) ** 2 / 50000
      if (isMobile) exponentialMultiplier = exponentialMultiplier * 6
      setValue((prev) =>
        prev + Math.sign(deltaX) * 50 * exponentialMultiplier > 0
          ? (prev + Math.sign(deltaX) * 50 * exponentialMultiplier) % (delay * videos.length)
          : delay * videos.length -
            Math.abs(
              (prev + Math.sign(deltaX) * 50 * exponentialMultiplier) % (delay * videos.length),
            ),
      )
      valueRef.current = value

      referenceX.current = e.clientX // reset para próximo passo
      videoRefs.current[Math.abs(Math.floor(value / delay) % videos.length)]?.seekTo(
        currentVideoTime / 1000,
        'seconds',
      )
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    const now = performance.now()
    // garante que o loop vai usar o value atual como ponto de partida:
    startTimeRef.current = now - valueRef.current
    lastTimeRef.current = now
    startX.current = e.clientX
    dragging.current = false
    if (startX.current !== referenceX.current) {
      setPlay(true)
      playRef.current = true
    } else {
      setPlay(!wasPlaying)
      setWasPlaying(!wasPlaying)
    }

    setHasInteracted(true)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    if (!touch) return
    dragging.current = true
    referenceX.current = touch.clientX
    startX.current = touch.clientX
    setWasPlaying(play)
    setPlay(false)
    playRef.current = false
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()

    if (!dragging.current) return

    const touch = e.touches[0]
    if (!touch) return

    const deltaX = touch.clientX - referenceX.current

    if (Math.abs(deltaX) > 5) {
      let exponentialMultiplier = 1 + Math.abs(referenceX.current - startX.current) ** 2 / 50000
      if (isMobile) exponentialMultiplier = exponentialMultiplier * 6
      setValue((prev) =>
        prev + Math.sign(deltaX * -1) * 50 * exponentialMultiplier > 0
          ? (prev + Math.sign(deltaX * -1) * 50 * exponentialMultiplier) % (delay * videos.length)
          : delay * videos.length -
            Math.abs(
              (prev + Math.sign(deltaX * -1) * 50 * exponentialMultiplier) %
                (delay * videos.length),
            ),
      )
      valueRef.current = value

      referenceX.current = touch.clientX

      videoRefs.current[Math.abs(Math.floor(value / delay) % videos.length)]?.seekTo(
        currentVideoTime / 1000,
        'seconds',
      )
    }
  }

  const handleTouchEnd = () => {
    const now = performance.now()
    startTimeRef.current = now - valueRef.current
    lastTimeRef.current = now
    dragging.current = false

    if (Math.abs(startX.current - referenceX.current) > 10) {
      setPlay(true)
      playRef.current = true
    } else {
      setPlay(!!wasPlaying)
      setWasPlaying(!!wasPlaying)
    }

    setHasInteracted(true)
  }

  return (
    <div
      className="bg-black w-full h-dvh relative overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        // setPlay(false)
        setShowMouseFollower(false)
      }}
      onMouseEnter={() => setShowMouseFollower(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="fixed left-4 top-4 z-[5]">
        <img
          src="https://cdn.prod.website-files.com/653045b639002e30b3733e4c/665676a972842ca604b92e08_jaynossauro.png"
          alt=""
          className="w-16"
        />
      </div>
      {false && (
        <div className="fixed z-[999] text-xs w-max left-5 top-5 bg-black text-white grid gap-2">
          <p>
            Total time: {Math.floor(value / 1000)}:
            {Math.floor((value - Math.floor(value / 1000) * 1000) / 10)}
          </p>
          <p>Current video: {current + 1}</p>
          <p>Current video time: {currentVideoTime}</p>
          <p>{JSON.stringify(play)}</p>
        </div>
      )}
      {showMouseFollower && (
        <MouseFollower
          isPlaying={play}
          mouseIsOverList={mouseIsOverList}
          currentVideoTime={currentVideoTime}
          isMobile={isMobile}
        />
      )}
      <AnimatePresence>
        {!play && (
          <motion.h1
            initial={{opacity: 1, width: 0}}
            animate={{opacity: 1, width: 'initial'}}
            exit={{opacity: 1, height: 0}}
            transition={{duration: 0.15, ease: 'easeOut'}}
            className="select-none absolute top-1/2 left-1/2 overflow-hidden -translate-x-1/2 -translate-y-[calc(50%+6vw)]  z-[2] uppercase font-bold text-[5vw] md:text-[3.6vw] bg-amber-300 w-max px-8 whitespace-nowrap"
          >
            <AnimatePresence>
              {!play && (
                <motion.span
                  className="inline-block text-gray-900"
                  initial={{opacity: 1, y: '100%'}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 1, y: '-100%'}}
                  transition={{delay: 0.12}}
                >
                  {videos[current].title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.h1>
        )}
      </AnimatePresence>
      {/* Video Wrapper */}
      <button className="w-full h-full cursor-pointer">
        {videos.map((video, index) => {
          return (
            <AnimatePresence key={video._id + 'video'}>
              <motion.div
                onClick={() => {
                  // setWasPlaying(play);
                  // setPlay(false);
                }}
                className={`w-full h-full top-0 left-0 absolute transition duration-150 ${
                  index === current ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div
                  className={cn(
                    'max-w-3xl max-h-[calc(9/16*48rem)] w-[75svw] h-[calc(9/16*75svw)]  top-1/2 left-1/2 -translate-x-1/2  relative rounded-[1vw] overflow-hidden transition-all duration-500',
                    play
                      ? 'w-full h-dvh max-w-full max-h-full rounded-none -translate-y-1/2'
                      : ' -translate-y-[calc(50%+6vw)]',
                  )}
                >
                  <ReactPlayer
                    ref={(el) => (videoRefs.current[index] = el!) as any}
                    playsinline
                    url={video.video}
                    poster={video.coverImage}
                    width={'100%'}
                    height={'100%'}
                    className="h-full w-full relative pointer-events-none [&>video]:w-full [&>video]:h-full [&>video]:object-center [&>video]:object-cover"
                    playing={play && index === current}
                    // onProgress={(progress) => console.log(progress)}
                    onReady={() =>
                      setReady((prev) => ({
                        ...prev,
                        [index]: true,
                      }))
                    }
                    muted
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          )
        })}
      </button>
      {/* Video List */}
      <AnimatePresence>
        {!play && (
          <motion.div
            initial={{y: 200}}
            animate={{y: 0}}
            exit={{y: 200}}
            transition={{delay: 0.3, bounce: 0.5}}
            className={cn('')}
          >
            <VideoList
              videos={videos}
              current={current}
              currentTime={value}
              currentVideoTime={currentVideoTime}
              setMouseIsOverList={setMouseIsOverList}
              delay={delay}
              isMobile={isMobile}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
