'use client'
import { useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import Image from 'next/image'

const brandLogos = [
  '/brands/msi-logo.png',
  '/brands/rog-logo.png',
  '/brands/nvidia-logo.png',
  '/brands/amd-logo.png',
  '/brands/intel-logo.png',
  '/brands/Razer-Logo.png',
  // Añade más logos según sea necesario
]

export default function AboutUs() {
  const controls = useAnimation()
  const containerRef = useRef(null)
  const isInView = useInView(containerRef)

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <section className="py-8 -mt-24 md:mt-24">
      <div className="container mx-auto px-4">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h2 
            className="text-4xl font-bold bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text mb-4 text-center"
            variants={itemVariants}
          >
            ¿Que hacemos?
          </motion.h2>
          <motion.p 
            className="text-white sm:text-lg md:text-2xl text-lg  mb-20 max-w-6xl mx-auto text-center"
            variants={itemVariants}
          >
            Ofrecemos PCs personalizadas de alta gama, diseñadas para maximizar el rendimiento en juegos, creación de contenido y tareas profesionales. Nos especializamos en equipos potentes y configuraciones a medida, utilizando componentes de primera línea como gráficas RTX y procesadores de última generación. Nuestro objetivo es brindarte tecnología de alta calidad a precios competitivos, con asesoramiento experto para que elijas la mejor configuración según tus necesidades.
            <br /><br />Ofrecemos computadoras armadas a medida, computadoras nuevas con gráficas RTX línea 40, computadoras nuevas con gráficas de outlet línea RTX 30, tambien ofrecemos una gama de productos seleccionados para gaming como teclados, sillas, etc. Aseguramos la mejor calidad posible, no dudes en consultarnos, presupuestamos sin cargo.          </motion.p>
        </motion.div>

        <div className="relative h-24 overflow-hidden bg-gray-800 rounded-lg">
          <motion.div
            className="flex absolute"
            animate={{
              x: [`0%`, `-50%`]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear"
              }
            }}
            style={{
              width: `${brandLogos.length * 240}px`
            }}
          >
            {[...brandLogos, ...brandLogos].map((logo, index) => (
              <div key={index} className="mx-4 flex-shrink-0 bg-white rounded-lg p-4 shadow-lg">
                <div className="w-40 h-16 relative">
                  <Image
                    src={logo}
                    alt={`Brand logo ${index + 1}`}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}