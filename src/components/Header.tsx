'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        {/* <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          ATLAS
        </h1> */}
        <h1 className='inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-[8rem] text-transparent'>
        ATLAS
        </h1>
        <p className="text-xl text-gray-300 mb-8">Experience computing at the edge of possibility</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/custom-pcs" className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 inline-block">
            Explore Custom PCs
          </Link>
        </motion.div>
      </motion.section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {['Custom PCs', 'Premium Peripherals', 'High-End Monitors'].map((item, index) => (
          <motion.div 
            key={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-900 shadow-lg relative overflow-hidden rounded-xl border border-gray-800 p-[1px] backdrop-blur-3xl"
          >
                  <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                  <div className='flex flex-col h-full w-full items-start justify-center rounded-xl bg-black px-3 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl ' >
                  <h2 className="text-2xl font-semibold mb-4 text-white p-2">{item}</h2>
                    <p className="text-gray-300 mb-4 p-2">Experience the future of technology with our cutting-edge {item.toLowerCase()}.</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-blue-500 font-semibold hover:underline p-2">
                        Discover More
                      </Link>
                  
                    </motion.div>
                  </div>
          </motion.div>
        ))}
      </section>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gray-900 p-8 rounded-lg border border-blue-500"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Featured Product</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Image src="/placeholder.svg" alt="Quantum X9000" width={500} height={300} className="rounded-lg" />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h3 className="text-2xl font-semibold mb-4 text-blue-500">Quantum X9000</h3>
            <p className="text-gray-300 mb-4">
              Harness the power of quantum computing with our groundbreaking Quantum X9000. 
              Featuring next-gen processors and unparalleled graphics capabilities, the future of computing, available today.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/custom-pcs/quantum-x9000" className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 inline-block">
                Explore the Quantum X9000
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}