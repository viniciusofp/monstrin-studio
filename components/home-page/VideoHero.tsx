'use client'

import {AnimatePresence, motion} from 'motion/react'
import {useEffect, useMemo, useRef, useState} from 'react'
import ReactPlayer from 'react-player'
import {useMediaQuery} from 'usehooks-ts'
import MouseFollower from './MouseFollower'
import VideoList from './VideoList'

const videos = [
  {
    _id: 0,
    title: 'Ari Lennox | Get Close 1',
    coverImage: 'https://eringwesley.com/uploads/Ari_Lennox_Get_Close_1_8961ce5727_99909a8b5f.jpg',
    video: 'https://eringwesley.com/uploads/Ari_Lennox_Get_Close_1_410dd74c0a_981c905ff8.mp4#t=0.5',
  },
  {
    _id: 1,
    title: '6lack Umi | Says 1',
    coverImage: 'https://eringwesley.com/uploads/6lack_Umi_Says_1_1_e7ee64b92b.jpg',
    video: 'https://eringwesley.com/uploads/6lack_Umi_Says_1_9f7f439b34_b2ba046679.mp4#t=0.5',
  },
  {
    _id: 2,
    title: 'Ari Lennox | Get Close 2',
    coverImage: 'https://eringwesley.com/uploads/Ari_Lennox_Get_Close_2_1_9b5d788256.jpg',
    video: 'https://eringwesley.com/uploads/Ari_Lennox_Get_Close_2_346026a2d1_85a1bac50b.mp4#t=0.5',
  },
  {
    _id: 3,
    title: '6lack Umi | Says 2',
    coverImage: 'https://eringwesley.com/uploads/6lack_Umi_Says_2_2_ea0d7fa34e.jpg',
    video: 'https://eringwesley.com/uploads/6lack_Umi_Says_2_f946c38fe0_932a3eef36.mp4#t=0.5',
  },
  {
    _id: 4,
    title: 'Ari Lennox | Get Close 3',
    coverImage: 'https://eringwesley.com/uploads/Ari_Lennox_Get_Close_3_1_2587eace72.jpg',
    video: 'https://eringwesley.com/uploads/Ari_Lennox_Get_Close_3_535a3c78c3_0f78155317.mp4#t=0.5',
  },
]

// const videos = [
//   {
//     _id: 0,
//     title: 'Pergunta pra folhinha',
//     coverImage:
//       'https://cdn.prod.website-files.com/6656ae067079c1811b0e5513/6656b664b8a63217877bb348_folhinha.png',
//     video: 'https://www.youtube.com/watch?v=PfK22JsL0jM'
//   },
//   {
//     _id: 1,
//     title: 'Lab Vivo de Ideias',
//     coverImage:
//       'https://cdn.prod.website-files.com/6656ae067079c1811b0e5513/669c28a534416a0103bba113_Screenshot%202024-07-20%20at%2018.13.21.png',
//     video: 'https://vimeo.com/389322122'
//   },
//   {
//     _id: 2,
//     title: 'Make it Happn',
//     coverImage:
//       'https://cdn.prod.website-files.com/6656ae067079c1811b0e5513/669c045add02ee5e3dded2a6_Screenshot%202024-07-20%20at%2015.37.54_1.png',
//     video: 'https://www.youtube.com/watch?v=MT_z48PAXgY'
//   },
//   {
//     _id: 3,
//     title: 'Famílias',
//     coverImage:
//       'https://cdn.prod.website-files.com/6656ae067079c1811b0e5513/66cd03e32aaee865981eb487_Screenshot%202024-08-26%20at%2018.40.50_1.png',
//     video: 'https://vimeo.com/291951622'
//   },
//   {
//     _id: 4,
//     title: 'Cartografia Negra',
//     coverImage:
//       'https://cdn.prod.website-files.com/6656ae067079c1811b0e5513/66d8b5d31598bd790cebec9d_Screenshot%202024-09-04%20at%2016.31.16_1.png',
//     video: 'https://www.youtube.com/watch?v=IBKsXJH4y40'
//   }
// ];

const delay = 7000
export default function VideoHero() {
  const isMobile = useMediaQuery('(max-width: 48rem')

  const [mouseIsOverList, setMouseIsOverList] = useState(false)
  const [play, setPlay] = useState(true)
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
      className="bg-gray-950 w-full h-svh relative [&_*]cursor-none overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setPlay(false)}
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
      <MouseFollower
        isPlaying={play}
        mouseIsOverList={mouseIsOverList}
        currentVideoTime={currentVideoTime}
        isMobile={isMobile}
      />
      <AnimatePresence>
        {!play && (
          <motion.h1
            initial={{opacity: 1, width: 0}}
            animate={{opacity: 1, width: 'initial'}}
            exit={{opacity: 1, height: 0}}
            transition={{duration: 0.15, ease: 'easeOut'}}
            className="select-none absolute top-1/2 left-1/2 overflow-hidden -translate-x-1/2 -translate-y-1/2 -mt-[calc(((100vw/5*9/7)-5rem))] md:-mt-[calc(((100vw/5*9/16)-3.5rem))] z-[2] uppercase font-bold text-[5vw] md:text-[3.6vw] bg-amber-300 w-max px-8 whitespace-nowrap"
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
      {/* Gradient */}
      <div className="absolute pointer-events-none top-0 left-0 w-full h-full z-[1] bg-gradient-to-b from-transparent to-black"></div>
      {/* Video Wrapper */}
      <button className="w-full h-full cursor-none">
        {videos.map((video, index) => {
          return (
            <AnimatePresence key={video._id + 'video'}>
              <motion.div
                onClick={() => {
                  // setWasPlaying(play);
                  // setPlay(false);
                }}
                className={`w-full h-full top-0 left-0 absolute transition duration-150 mix-blend-screen ${
                  index === current ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="w-full h-full relative">
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

      <VideoList
        videos={videos}
        current={current}
        currentTime={value}
        currentVideoTime={currentVideoTime}
        setMouseIsOverList={setMouseIsOverList}
        delay={delay}
        isMobile={isMobile}
      />
    </div>
  )
}
