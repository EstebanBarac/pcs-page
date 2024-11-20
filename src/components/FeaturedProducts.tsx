'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface Category {
  id: string
  title: string
  image: string
  link: string
}

const categories: Category[] = [
  {
    id: 'rtx30',
    title: 'PCs Nuevas con RTX 30 Outlet',
    image: '/PCS-OUTLET.jpeg',
    link: '/categoria/pcs-nuevas-graficas-outlet'
  },
  {
    id: 'rtx40',
    title: 'PCs Nuevas',
    image: '/pcs-nuevas.jpg',
    link: '/categoria/pcs-nuevas-rtx-40'
  },
  {
    id: 'accessories',
    title: 'Placas de Video',
    image: '/RTX40-graficas.jpg',
    link: '/categoria/placas-de-video'
  },
  {
    id: 'laptops',
    title: 'Periféricos',
    image: '/perifericos.jpg',
    link: '/categoria/perifericos'
  }
]

export default function CategoryShowcase() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const router = useRouter()

  return (
    <div className="md:mt-24 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text mb-12">Categorías</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="relative h-96 rounded-lg overflow-hidden shadow-lg cursor-pointer"
              style={{
                backgroundImage: `url(${category.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredCategory(category.id)}
              onHoverEnd={() => setHoveredCategory(null)}
              onClick={() => router.push(category.link)}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <motion.h2
                  className="text-3xl font-bold text-white text-center px-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {category.title}
                </motion.h2>
              </div>
              {hoveredCategory === category.id && (
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.span
                    className="text-white text-2xl font-bold"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Explorar
                  </motion.span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}