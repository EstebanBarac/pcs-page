'use client'

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Loader from './Loader'
import { ArrowRight } from 'lucide-react'

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

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const fetchedProducts = await getProductsByCategory(1); // Assuming 1 is the ID for the category
  
      // Sort products by price (considering discounted price if available)
      const sortedProducts = fetchedProducts.sort((a, b) => {
        const priceA = a.discounted_price !== null ? a.discounted_price : a.price;
        const priceB = b.discounted_price !== null ? b.discounted_price : b.price;
        return priceA - priceB;
      });
  
      // Limit to 3 products
      const limitedProducts = sortedProducts.slice(0, 3);
  
      setProducts(limitedProducts);
      setLoading(false);
    }
  
    loadProducts();
  }, []);
  
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-bold text-white text-center text-4xl sm:text-5xl md:text-5xl mb-2">
          NUESTROS{' '}
          <span className="text-[#6E3AFF]">MODELOS</span>
        </h2>
        <div className="mt-4 text-end">
        <Link href="/modelos" className="inline-flex items-center text-amber-500 hover:text-amber-600 transition-colors">
          <span className="text-lg font-semibold mr-2">Ver todos los modelos</span>
          <ArrowRight className="w-6 h-6" />
        </Link>
      </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mt-4">
          {products.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-sm"
            >
              <div className="bg-black shadow-xl overflow-hidden rounded-lg">
                {/* Main Product Image */}
                <div className="relative aspect-square">
                  <Image
                    src={product.images[0]?.url || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-white text-lg font-bold mb-2 truncate">{product.name}</h3>
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
                  
                  {/* Action Buttons */}
                  <Button 
                    className={`w-full ${
                      product.in_stock ? 'bg-amber-500 hover:bg-amber-800' : 'bg-gray-600 cursor-not-allowed'
                    }`}
                    disabled={!product.in_stock}
                  >
                    <Link href={`/products/${product.id}`} className="w-full text-center">
                      {product.in_stock ? 'VER DETALLES' : 'SIN STOCK'}
                    </Link> 
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No hay productos disponibles en esta categoría.</p>
        )}
      </div>
    </div>
  )
}