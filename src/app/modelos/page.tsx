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
  const [newProducts, setNewProducts] = useState<Product[]>([])
  const [outletProducts, setOutletProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      const [fetchedNewProducts, fetchedOutletProducts] = await Promise.all([
        getProductsByCategory(1),
        getProductsByCategory(3)
      ])

      const sortProducts = (products: Product[]) => 
        products.sort((a, b) => {
          const priceA = a.discounted_price !== null ? a.discounted_price : a.price
          const priceB = b.discounted_price !== null ? b.discounted_price : b.price
          return priceA - priceB
        })

      setNewProducts(sortProducts(fetchedNewProducts))
      setOutletProducts(sortProducts(fetchedOutletProducts))
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

  const ProductGrid = ({ products }: { products: Product[] }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black shadow-xl overflow-hidden"
        >
          <div className="relative aspect-square">
            <Image
              src={product.images[0]?.url || '/placeholder.jpg'}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            {product.discounted_price && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                ${product.price - product.discounted_price} OFF
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="text-white text-md font-bold mb-2">{product.name}</h3>
            
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
                  product.in_stock ? 'bg-amber-500 hover:bg-amber-700' : 'bg-gray-600 cursor-not-allowed'
                }`}
                disabled={!product.in_stock}
              >
                <Link href={`/products/${product.id}`}>
                  {product.in_stock ? 'VER DETALLES' : 'SIN STOCK'}
                </Link> 
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black">
      {/* New PCs Section */}
      <div className="pt-12">
        <h2 className="font-bold text-white text-center text-4xl sm:text-5xl md:text-5xl">
          NUESTROS{' '}
          <span className="text-[#6E3AFF]">MODELOS</span>
        </h2>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ProductGrid products={newProducts} />
        
        {newProducts.length === 0 && (
          <p className="text-center text-gray-400 mt-8">
            No hay productos disponibles en esta categoría.
          </p>
        )}
      </div>

      {/* Outlet PCs Section */}
      <div className="pt-12">
        <h2 className="font-bold text-white text-center text-4xl sm:text-5xl md:text-5xl">
          MODELOS{' '}
          <span className="text-[#6E3AFF]">GRÁFICAS OUTLET</span>
        </h2>
      </div>
      <div className='flex justify-center mt-12'>
        <Button 
          className='flex text-center mb-2 bg-amber-500 hover:bg-amber-700'
        >
          <Link className='text-lg' href='/outlet-explicacion'>
            ¿Que son las Gráficas Outlet?
          </Link> 
        </Button>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ProductGrid products={outletProducts} />
        
        {outletProducts.length === 0 && (
          <p className="text-center text-gray-400 mt-8">
            No hay productos outlet disponibles.
          </p>
        )}
      </div>
    </div>
  )
}