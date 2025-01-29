'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function SocialMediaSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error)
      })
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* iPhone Frame with Video */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-[300px] h-[600px]"
          >
            {/* iPhone Frame */}
            <div className="absolute inset-0 bg-gray-800 rounded-[3rem] shadow-2xl">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-7 bg-black rounded-b-2xl"></div>
              
              {/* Video Container */}
              <div className="absolute inset-0 m-[12px] rounded-[2.5rem] overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                >
                  <source src="/video/pc-build.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 text-white text-center md:text-right"
          >
            <h2 className=" text-white font-bold text-5xl md:text-5xl mb-4">
              SEGUINOS EN{' '}
              <span className="text-[#6E3AFF]">NUESTRAS REDES</span>
            </h2>
            <p className="text-xl md:text-xl md:text-right text-gray-300 max-w-8xl">
              MIRA MAS ARMADOS COMO ESTE Y TODO NUESTRO CONTENIDO
            </p>
            
            {/* Social Media Links */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-end">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-amber-600 hover:bg-amber-800 transition-colors px-6 py-3 rounded-sm text-white font-semibold"
              >
                @NoxusPC_
              </a>
              {/* <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-full text-white font-semibold"
              >
                TikTok
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-full text-white font-semibold"
              >
                YouTube
              </a> */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}