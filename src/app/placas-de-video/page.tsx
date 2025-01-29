'use client'

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface Product {
  id: string
  name: string
  description: string
  shortdescription: string
  price: number
  discounted_price: number | null
  images: { url: string }[]
  recommended: boolean
  in_stock: boolean
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
}

export default function PcsNuevasGraficasOutletPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      const fetchedProducts = await getProductsByCategory(4)
      const sortedProducts = fetchedProducts.sort((a, b) => {
        const priceA = a.discounted_price !== null ? a.discounted_price : a.price
        const priceB = b.discounted_price !== null ? b.discounted_price : b.price
        return priceA - priceB
      })
      setProducts(sortedProducts)
      setLoading(false)
    }

    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0D0B1F]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black">
      <div className="pt-12">
        <h2 className="font-bold text-white text-center text-4xl sm:text-5xl md:text-5xl">
          PLACAS DE{' '}
          <span className="text-[#6E3AFF]">VIDEO</span>
        </h2>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-black w-96 shadow-xl mx-9 overflow-hidden"
            >
              <div className="relative m-auto h-64">
                <Image
                  src={product.images[0]?.url || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
                {product.discounted_price && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                    ${product.price - product.discounted_price} OFF
                  </div>
                )}
              </div>

              {/* Benchmark Images */}
              {/* <div className="flex gap-2 p-2 bg-black/50">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="relative w-[60px] h-[30px]">
                    <Image
                      src="/placeholder.svg"
                      alt="Performance benchmark"
                      layout="fill"
                      className="object-cover rounded"
                    />
                  </div>
                ))}
              </div> */}

              <div className="p-4">
                <h3 className="text-white text-md font-bold mb-2">{product.name}</h3>
                {/* <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.shortdescription}</p> */}
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-baseline gap-2 mb-4">
                    {product.discounted_price ? (
                      <>
                        <span className="text-gray-400 line-through text-sm">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-white text-2xl font-bold">
                          {formatPrice(product.discounted_price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-white text-2xl font-bold">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  <Button 
                    className={`w-full mb-2 ${
                      product.in_stock ? 'bg-amber-500 hover:bg-amber-800' : 'bg-gray-600 cursor-not-allowed'
                    }`}
                    disabled={!product.in_stock}
                  >
                    <Link href={`/products/${product.id}`}>
                        {product.in_stock ? 'VER DETALLES' : 'SIN STOCK'}
                    </Link> 
                  </Button>

                  {/* <Link 
                    href={`/products/${product.id}`}
                    className="text-center text-sm text-amber-600 hover:text-amber-500 transition-colors"
                  >
                    Ver Detalles
                  </Link> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-gray-400 mt-8">
            No hay productos disponibles en esta categoría.
          </p>
        )}
      </div>
    </div>
  )
}