'use client'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDownIcon } from 'lucide-react'
import localFont from 'next/font/local'
import Image from 'next/image'

const horizon = localFont({ src: '../../public/fonts/horizon.otf' })

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.play().catch(error => {
        console.log("Autoplay was prevented:", error)
      })
    }
  }, [])

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 m-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-12"
        >
          <h1 className={`${horizon.className} text-6xl mt-28 md:mt-2 md:text-8xl bg-clip-text bg-white`}>
            NOXUS
          </h1>
          <p className="text-xl font-extrabold md:text-2xl bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text">
            HARDWARE
          </p>
        </motion.div>   
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
        </motion.div>
        <Image
              src='/banners/banner 1-home (1).png'
              alt="banner-1"
              width="1500"
              height="200"
              className="" 
            />
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
      </div>
    </div>
  )
}
