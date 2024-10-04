import { cache } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const revalidate = 0 // revalidate the data at most every hour

export const getProducts = cache(async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  // Formatear los datos para que coincidan con la estructura esperada
  return data.map(product => ({
    id: product.id,
    name: product.name,
    description_primera: product.description_primera,
    description_segunda: product.description_segunda,
    price: product.price,
    category_id: product.category_id,
    shortdescription: product.shortdescription,
    image: product.images[0] || '', // Asumiendo que 'images' es un array
    // Añade cualquier otro campo que tus componentes esperen
  }))
})