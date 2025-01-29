'use client'

import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../../context/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Product {
  id: string;
  name: string;
  shortdescription: string;
  description_primera: string;
  description_segunda: string;
  price: number;
  discounted_price: number | null;
  images: { url: string }[];
  category_id: number;
  spec_mother: string;
  spec_procesador: string;
  spec_grafica: string;
  spec_refrigeracion: string;
  spec_fuente: string;
  spec_ram: string;
  in_stock: boolean;
}

interface Category {
  id: number;
  name: string;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

async function getProductWithCategory(id: string): Promise<{ product: Product; category: Category } | null> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories:category_id (
        id,
        name
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  if (!data) {
    console.error('No product found with id:', id);
    return null;
  }

  return {
    product: {
      id: data.id,
      name: data.name,
      shortdescription: data.shortdescription || '',
      price: data.price,
      discounted_price: data.discounted_price,
      images: typeof data.images === 'string' ? JSON.parse(data.images) : data.images,
      category_id: data.category_id,
      description_primera: data.description_primera,
      description_segunda: data.description_segunda,
      spec_mother: data.spec_mother,
      spec_procesador: data.spec_procesador,
      spec_grafica: data.spec_grafica,
      spec_refrigeracion: data.spec_refrigeracion,
      spec_fuente: data.spec_fuente,
      spec_ram: data.spec_ram,
      in_stock: data.in_stock,
    },
    category: {
      id: data.categories.id,
      name: data.categories.name,
    },
  };
}

function ProductSpecs({ product }: { product: Product }) {
  const specs = [
    { name: "GABINETE", value: product.spec_mother },
    { name: "GPU", value: product.spec_grafica },
    { name: "CPU", value: product.spec_procesador },
    { name: "MOTHERBOARD", value: product.spec_mother },
    { name: "RAM", value: product.spec_ram },
    { name: "ENFRIAMIENTO", value: product.spec_refrigeracion },
    { name: "FUENTE", value: product.spec_fuente },
    { name: "SOFTWARE", value: "WINDOWS 11" },
    { name: "MEMORIA", value: "1TB KINGSTON NV5" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-8">
      {specs.map((spec, index) => (
        <div key={index} className="bg-[#1A1731]/80 p-4 w-48 rounded-xs backdrop-blur-sm">
          <h3 className="text-white text-lg text-center font-bold mb-4">{spec.name}</h3>
          <p className="text-gray-400 text-center">{spec.value}</p>
        </div>
      ))}
    </div>
  );
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [productData, setProductData] = useState<{ product: Product; category: Category } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { addItem } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProductWithCategory(params.id);
        if (data) {
          setProductData(data);
        } else {
          setError('No se pudo encontrar el producto');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Ocurrió un error al cargar el producto');
      }
      setIsLoading(false);
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (productData?.product && productData.product.in_stock) {
      const { id, name, price, discounted_price } = productData.product;
      addItem({
        id,
        name,
        price: discounted_price || price,
        quantity: 1,
      });
      toast({
        title: "Producto añadido",
        description: `${name} ha sido añadido al carrito.`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0D0B1F]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0D0B1F] text-white">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-xl mb-8">{error || 'Ocurrió un error al cargar el producto'}</p>
        <Button onClick={() => router.push('/')}>Volver a la página principal</Button>
      </div>
    );
  }

  const { product } = productData;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div 
      className="min-h-screen bg-center"
      style={{
        backgroundImage: `url('/fondo/fondo01prueba.png')`,
      }}
    >
      <div className="min-h-screen bg-black/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-8 text-center text-white">
            {product.name}
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="aspect-square relative rounded-lg overflow-hidden"
                >
                  <Image
                    src={product.images[currentImageIndex].url || "/placeholder.svg"}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </motion.div>
              </AnimatePresence>
              <button 
                onClick={prevImage} 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextImage} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className=" p-6 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-white">Especificaciones</h2>
              <ProductSpecs product={product} />
              <div className="mb-4">
                {product.discounted_price ? (
                  <>
                    <span className="text-2xl text-gray-400 line-through mr-2">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-4xl font-bold text-amber-600">
                      {formatPrice(product.discounted_price)}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-white">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              <Button 
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className={`w-full py-3 text-lg font-bold ${
                  product.in_stock ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                {product.in_stock ? 'AÑADIR AL CARRITO' : 'SIN STOCK'}
              </Button>
            </div>
          </div>

          <div className="mb-16 bg-[#1A1731]/80 p-6 rounded-md backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-4 text-white">Descripción</h2>
            <p className="text-gray-300 text-xl mb-4">{product.description_primera}</p>
            <p className="text-gray-300 text-xl">{product.description_segunda}</p>
          </div>

          {/* You can add more sections here, like customer reviews, related products, etc. */}
        </div>
      </div>
    </div>
  );
}