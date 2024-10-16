"use client"

import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface Product {
  id: string
  name: string
  description: string
  shortdescription: string
  price: number
  images: { url: string }[]
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

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function PcsNuevasGraficasOutletPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      const fetchedProducts = await getProductsByCategory(1) // Asumiendo que 2 es el ID de la categoría
      setProducts(fetchedProducts)
      setLoading(false)
    }

    loadProducts()
  }, [])

  if (loading) {
    return <div className="text-center py-10">Cargando productos...</div>
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold mb-8 text-center text-white">PCs Nuevas con Gráficas Series 40 Nuevas</h1>

    {/* Grid con más espacio entre columnas y filas */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 w-full max-w-sm"
        >
          {/* Imagen de mayor tamaño */}
          <div className="relative h-64 w-full">
            <Image
              src={product.images[0]?.url || '/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 hover:text-amber-600">{product.name}</h2>
            <p className="text-base text-black mb-4">{product.shortdescription}</p>
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text">{formatPrice(product.price)}</span>
              <Link
                href={`/products/${product.id}`}
                className="bg-gradient-to-r from-[#FF512F] to-[#F09819] text-white px-4 py-3 rounded-3xl hover:opacity-60 transition duration-300"
              >
                Ver detalles
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>

    {products.length === 0 && (
      <p className="text-center text-gray-600 mt-8">No hay productos disponibles en esta categoría.</p>
    )}
  </div>
</div>

  )
}