'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Cpu } from 'lucide-react'

type PromotionalBannerProps = {
  title: string
  description: string
  linkText: string
  linkHref: string
}

export default function PromotionalBanner({ title, description, linkText, linkHref }: PromotionalBannerProps) {
  return (
    <div className="bg-gradient-to-r hidden sm:block from-gray-900 to-blue-900 text-white py-16 relative overflow-hidden mt-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="h-full w-full bg-grid-pattern"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          <div className="mb-8 md:mb-0 text-center md:text-left md:w-2/3">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Cpu className="mr-2 h-8 w-8 text-blue-400" />
              {title}
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {description}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Link href={linkHref} className="group relative">
              <span className="relative bg-black text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center transition duration-300 transform hover:scale-105 hover:bg-gray-900">
                {linkText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}