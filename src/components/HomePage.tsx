'use client'
import {  useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {  ChevronDownIcon,  } from 'lucide-react'
import localFont from 'next/font/local'

const blanka = localFont({ src: '../../public/fonts/Blanka-Regular.otf' })

export default function HomePage() {
 
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement) {
      // Autoplay
      videoElement.play().catch(error => {
        console.log("Autoplay was prevented:", error)
      })
    }
    return () => {
      if (videoElement) {
      }
    }
  }, [])

  return (
    <div className="min-h-screen  text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-12"
        >
          <h1 className={`${blanka.className} text-8xl mt-32 md:mt-2 md:text-9xl bg-clip-text bg-white`}>
            ATLAS
          </h1>
          <p className="text-xl mt-4 font-bold md:text-2xl bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text">
            Descubre el futuro con nuestros productos
          </p>
          {/* <Link href="/products" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 inline-block">
            Explorar Productos
          </Link> */}
        </motion.div>

        <div className="relative w-full max-w-6xl mx-auto rounded-lg overflow-hidden shadow-2xl mb-32 md:mb-8">
          <video
            ref={videoRef}
            className="w-full h-auto"
            playsInline
            loop
          >
            <source src="pc-build.mp4" type="video/mp4" />
            Tu navegador no soporta el tag de video.
          </video>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <div className="flex items-center justify-between">
              {/* <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlayPause}
                className="text-white focus:outline-none"
                aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
              >
                {isPlaying ? (
                  <PauseIcon className="w-8 h-8" />
                ) : (
                  <PlayIcon className="w-8 h-8" />
                )}
              </motion.button> */}

              {/* <div className="w-full mx-4 bg-gray-600 rounded-full h-1.5">
                <motion.div
                  className="bg-white h-1.5 rounded-full"
                  style={{ width: `${progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div> */}

              {/* <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="text-white focus:outline-none"
                aria-label={isMuted ? "Activar sonido" : "Silenciar"}
              >
                {isMuted ? (
                  <VolumeXIcon className="w-6 h-6" />
                ) : (
                  <Volume2Icon className="w-6 h-6" />
                )}
              </motion.button> */}
            </div>
          </div>
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <ChevronDownIcon className="w-10 h-10 text-amber-600" aria-label="Desplázate hacia abajo para ver más contenido" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}