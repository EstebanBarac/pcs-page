'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SpecialOrdersSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <section className=" text-white py-16">
      <div className="container mx-auto px-4 mt-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">¿Buscas algo a medida?</h2>
          <p className="text-xl mb-8 px-8">
            Si queres modificar cualquier caracteristica de los modelos que tenemos o buscas un producto en especifico, consultanos y te asesoramos sin cargo.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            className="bg-gradient-to-r from-[#FF512F] to-[#F09819] text-white px-24 py-3 rounded-full text-lg font-semibold hover:opacity-75 transition duration-300"
          >
            Contactarse
          </motion.button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-lg p-8 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Solicitud de Pedido Especial</h3>
            <p className="text-gray-600 mb-6">
              Por favor, proporciona tus datos de contacto y una breve descripción de lo que estás buscando. 
              Nos pondremos en contacto contigo lo antes posible.
            </p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Describe tu pedido especial"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Enviar Solicitud
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  )
}