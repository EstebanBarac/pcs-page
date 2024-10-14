'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Link from 'next/link'

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-amber-600 text-white p-4 rounded-full shadow-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-slate-100 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {totalItems}
          </span>
        )}
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="absolute bottom-16 right-0 bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-80 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Tu Carrito</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            {items.length === 0 ? (
              <p className="text-gray-500 text-center">Tu carrito está vacío</p>
            ) : (
              <>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">${formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-2 text-sm text-black">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Total:</span>
                    <span className="text-lg font-semibold text-gray-800">${formatPrice(totalPrice)}</span>
                  </div>
                  <Link href="/checkout">
                    <button
                      onClick={() => {setIsOpen(false)}}
                      className="w-full bg-gradient-to-r from-[#FF512F] to-[#F09819] text-white py-2 px-4 rounded-md hover:opacity-75 transition duration-300"
                    >
                      Continuar con la Compra
                    </button>
                  </Link>    
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}