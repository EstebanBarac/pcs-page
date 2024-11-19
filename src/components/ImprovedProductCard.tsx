import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Product {
  id: string
  name: string
  shortdescription: string
  price: number
  discounted_price: number | null
  images: { url: string }[]
  recommended: boolean // New field added
}

interface ProductCardProps {
  product: Product
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

function calculateDiscountPercentage(originalPrice: number, discountedPrice: number): number {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
}

export function ImprovedProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-sm"
    >
      <div className="relative aspect-square">
        <Image
          src={product.images[0]?.url || '/placeholder.jpg'}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
        {product.discounted_price && (
          <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md font-semibold">
            {calculateDiscountPercentage(product.price, product.discounted_price)}% OFF
          </div>
        )}
        {product.recommended && (
          <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 m-2 rounded-md font-semibold">
            Recomendado
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 ">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.shortdescription}</p>
        <div className="flex justify-between items-end mb-3">
          <div>
            {product.discounted_price ? (
              <>
                <span className="text-md text-gray-500 line-through">{formatPrice(product.price)}</span>
                <span className="block text-3xl font-bold bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text">{formatPrice(product.discounted_price)}</span>
              </>
            ) : (
              <span className="text-3xl font-bold bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text">{formatPrice(product.price)}</span>
            )}
          </div>
          <div className="flex space-x-2">
            <Link href={`/products/${product.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#FF512F] to-[#F09819] text-white px-3 py-2 rounded-md hover:bg-amber-600 transition-colors duration-200"
              >
                Ver detalles
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}