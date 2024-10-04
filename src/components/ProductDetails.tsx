'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/router'

interface Specification {
  [key: string]: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  specifications: Specification | null;
}

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) fetchProduct()
  }, [id])

  async function fetchProduct() {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    setProduct(data)
  }

  if (!product) return <div className="container mx-auto px-4 py-8">Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="md:w-1/2">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="flex mt-4 space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                className={`w-20 h-20 object-cover cursor-pointer rounded-md ${
                  index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          {product.specifications && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="border-b border-gray-200 last:border-b-0">
                        <td className="px-4 py-3 text-left text-sm font-medium text-gray-600 capitalize">
                          {key.replace('_', ' ')}
                        </td>
                        <td className="px-4 py-3 text-left text-sm text-gray-800">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}