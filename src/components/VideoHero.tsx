'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlayIcon, PauseIcon } from 'lucide-react'

export default function VideoHero() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleProgress = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
    }
  }

  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleProgress)
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', handleProgress)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        playsInline
        muted
        loop
      >
        <source src="/pc-build.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        <div className="container mx-auto flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="text-white focus:outline-none"
          >
            {isPlaying ? (
              <PauseIcon className="w-8 h-8" />
            ) : (
              <PlayIcon className="w-8 h-8" />
            )}
          </motion.button>

          <div className="w-full mx-4 bg-gray-600 rounded-full h-1.5">
            <motion.div
              className="bg-white h-1.5 rounded-full"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-white text-sm">
            {isPlaying ? '1x' : 'Play'}
          </span>
        </div>
      </div>
    </div>
  )
}