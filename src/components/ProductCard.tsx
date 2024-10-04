'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { Product } from '../data/products'

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-48">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-amber-600">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-amber-600">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-400 transition duration-300"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  )
}