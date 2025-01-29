'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    title: "CONFIGURA TU PC",
    highlight: "A MEDIDA",
    buttonText: "CONFIGURAR AHORA",
    desktopImage: "/banners/banner-msi-1.png",
    mobileImage: "/banners/banner-1-mobile-6.svg",
    link: "/armado-a-medida"
  },
  {
    title: "MODELOS PC",
    highlight: "PLUG AND PLAY",
    buttonText: "VER MODELOS",
    desktopImage: "/banners/banner-1-home-multiple-8.png",
    mobileImage: "/banners/banner-2-mobile-6.svg",
    link: "/modelos" 
  },
  {
    title: "GRAFICAS NVIDIA",
    highlight: "RTX 30 Y RTX 40",
    buttonText: "VER GRÁFICAS",
    desktopImage: "/banners/banner-3-3.png",
    mobileImage: "/banners/banner-3-mobile-6.svg",
    link: "/placas-de-video"
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])


  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex-shrink-0">
              <Image src={'/NX_2.png'} alt='logo' width={100} height={100} className="w-auto h-auto" />
            </Link>
            
            <div className="hidden lg:flex items-center justify-between flex-1 space-x-8">
              <div className="flex items-center justify-start space-x-8">
                <Link href="/armado-a-medida" className="text-white hover:text-amber-600 transition-colors">
                  Armado a medida
                </Link>
                <Link href="/modelos" className="text-white hover:text-amber-600 transition-colors">
                  Modelos
                </Link>
                <Link href="/como-elegir" className="text-white hover:text-amber-600 transition-colors">
                  ¿Como elegir mi pc?
                </Link>
              </div>
              
              <div className="flex items-center justify-end space-x-8">
                <Link href="/placas-de-video" className="text-white hover:text-amber-600 transition-colors">
                  Placas de video
                </Link>
                <Link href="/monitores" className="text-white hover:text-amber-600 transition-colors">
                  Monitores
                </Link>
                <Link href="/sobre-nosotros" className="text-white hover:text-amber-600 transition-colors">
                  Sobre nosotros
                </Link>
              </div>
            </div>

            {/* <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-amber-600 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div> */}
          </div>
        </div>

        {/* Mobile menu */}
        {/* {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/armado-a-medida" className="block text-white hover:text-amber-600 transition-colors">
                Armado a medida
              </Link>
              <Link href="/modelos" className="block text-white hover:text-amber-600 transition-colors">
                Modelos
              </Link>
              <Link href="/como-elegir" className="block text-white hover:text-amber-600 transition-colors">
                ¿Como elegir mi pc?
              </Link>
              <Link href="/placas-de-video" className="block text-white hover:text-amber-600 transition-colors">
                Placas de video
              </Link>
              <Link href="/monitores" className="block text-white hover:text-amber-600 transition-colors">
                Monitores
              </Link>
              <Link href="/sobre-nosotros" className="block text-white hover:text-amber-600 transition-colors">
                Sobre nosotros
              </Link>
            </div>
          </div>
        )} */}
      </nav>

      {/* Hero Carousel (both mobile and desktop) */}
      <div className="h-screen w-full overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].desktopImage || "/placeholder.svg"}
              alt="Hero image"
              fill
              className="hidden md:block object-cover object-center w-full h-full"
              priority
            />
            <Image
              src={slides[currentSlide].mobileImage || "/placeholder.svg"}
              alt="Hero image"
              fill
              className="md:hidden object-cover object-center w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent">
              <div className="max-w-7xl mx-auto px-4 h-full flex items-center md:items-center">
                <div className="max-w-2xl md:mt-0 mt-auto mb-16">
                  <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl text-white font-bold mb-4">
                    {slides[currentSlide].title}{' '}
                    <span className="text-[#6E3AFF]">{slides[currentSlide].highlight}</span>
                  </h1>
                  <Link href={slides[currentSlide].link}>
                    <button className="bg-amber-600 hover:bg-amber-800 text-white rounded-sm text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-4 mt-4 sm:mt-8 transition-colors">
                      {slides[currentSlide].buttonText}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-amber-500' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}