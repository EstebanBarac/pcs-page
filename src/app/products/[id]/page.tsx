'use client'

import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useInView, useAnimation } from 'framer-motion';
import { useCart } from '../../../context/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

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

function AnimatedPCSection({ component, image, index }: { component: { name: string; description: string }; image: string; index: number }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-16 mb-32`}
    >
      <motion.div className="md:w-1/2" variants={itemVariants}>
        <motion.h2 
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text"
          variants={itemVariants}
        >
          {component.name}
        </motion.h2>
        <motion.p className="text-xl mb-4" variants={itemVariants}>{component.description}</motion.p>
      </motion.div>
      <motion.div 
        className="relative w-full md:w-1/2 h-[40vh] rounded-lg overflow-hidden"
        variants={imageVariants}
      >
        <Image
          src={image}
          alt={`${component.name}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </motion.div>
    </motion.div>
  );
}

function PCDetail({ product }: { product: Product }) {
  const components = [
    { name: "Motherboard", description: product.spec_mother },
    { name: "Procesador", description: product.spec_procesador },
    { name: "Tarjeta Gráfica", description: product.spec_grafica },
    { name: "Memoria RAM", description: product.spec_ram },
    { name: "Refrigeración", description: product.spec_refrigeracion },
    { name: "Fuente de Poder", description: product.spec_fuente },
  ];

  return (
    <>
      {components.map((component, index) => (
        <AnimatedPCSection key={component.name} component={component} image={product.images[index + 1]?.url || product.images[0].url} index={index} />
      ))}
    </>
  );
}

function PeripheralDetail({ product }: { product: Product }) {
  const sections = [
    { title: "", description: product.spec_mother },
    { title: "", description: product.spec_procesador },
  ];

  return (
    <>
      {sections.map((section, index) => (
        <AnimatedSection key={section.title} imageFirst={index % 2 !== 0}>
          <motion.div className="md:w-1/2" variants={fadeInUp}>
            <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
            <p className="text-xl mb-4">{section.description}</p>
          </motion.div>
          <motion.div 
            className="relative w-full md:w-1/2 h-[40vh] rounded-lg overflow-hidden"
            variants={fadeInUp}
          >
            <Image
              src={product.images[index + 1]?.url || product.images[0].url}
              alt={`${product.name} ${section.title}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
        </AnimatedSection>
      ))}
    </>
  );
}

function GraphicsCardDetail({ product }: { product: Product }) {
  return (
    <>
      <AnimatedSection>
        <motion.div className="md:w-1/2" variants={fadeInUp}>
          <h2 className="text-3xl font-bold mb-4">Caracteristicas</h2>
          <p className="text-xl mb-4">{product.spec_mother}</p>
        </motion.div>
        <motion.div 
          className="relative w-full md:w-1/2 h-[40vh] rounded-lg overflow-hidden"
          variants={fadeInUp}
        >
          <Image
            src={product.images[1]?.url || product.images[0].url}
            alt={`${product.name} especificaciones`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </motion.div>
      </AnimatedSection>
      <AnimatedSection imageFirst>
        <motion.div className="md:w-1/2" variants={fadeInUp}>
          <h2 className="text-3xl font-bold mb-4">Rendimiento</h2>
          <p className="text-xl mb-4">{product.spec_procesador}</p>
        </motion.div>
        <motion.div 
          className="relative w-full md:w-1/2 h-[40vh] rounded-lg overflow-hidden"
          variants={fadeInUp}
        >
          <Image
            src={product.images[2]?.url || product.images[0].url}
            alt={`${product.name} rendimiento`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </motion.div>
      </AnimatedSection>
    </>
  );
}

function AnimatedSection({ children, imageFirst = false }: { children: React.ReactNode; imageFirst?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
      }}
      className={`flex flex-col md:flex-row items-center justify-between gap-16 mb-32 ${
        imageFirst ? 'md:flex-row-reverse' : ''
      }`}
    >
      {children}
    </motion.div>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [productData, setProductData] = useState<{ product: Product; category: Category } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { addItem } = useCart();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
      <div className="flex items-center justify-center min-h-screen bg-gray-900 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-xl mb-8">{error || 'Ocurrió un error al cargar el producto'}</p>
        <Button onClick={() => router.push('/')}>Volver a la página principal</Button>
      </div>
    );
  }

  const { product, category } = productData;

  const renderProductDetails = () => {
    switch (category.id) {
      case 1: // PCs con Graficas nuevas
      case 3: // PCs Nuevos con Graficas Outlet
        return <PCDetail product={product} />;
      case 2: // Perifericos
        return <PeripheralDetail product={product} />;
      case 4: // Graficas
        return <GraphicsCardDetail product={product} />;
      default:
        return <PeripheralDetail product={product} />;
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-amber-600 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <AnimatedSection>
          <motion.h1 
            className="text-6xl font-bold mb-8 text-center w-full bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text"
            variants={fadeInUp}
          >
            {product.name}
          </motion.h1>
          <motion.div 
            className="relative w-full h-[60vh] rounded-lg overflow-hidden"
            variants={fadeInUp}
          >
            <Image
              src={product.images[0].url}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
        </AnimatedSection>

        {renderProductDetails()}

        <AnimatedSection>
          <motion.div className="text-center items-center justify-center rounded-md border border-gray-800 bg-gradient-to-b from-gray-950 to-black px-3 py-2 p-8 relative" variants={fadeInUp}>
            <h2 className='text-3xl font-bold mb-4 mt-4 bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text'>{product.name}</h2>
            <p className="text-lg mb-4 px-4">{product.description_primera}</p>
            <p className="text-lg mb-4 px-4">{product.description_segunda}</p>
            <div className="mb-4 mt-6">
              {product.discounted_price ? (
                <>
                  <h3 className="text-3xl font-bold line-through text-gray-500">{formatPrice(product.price)} ARS</h3>
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text">{formatPrice(product.discounted_price)} ARS</h3>
                </>
              ) : (
                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text">{formatPrice(product.price)} ARS</h3>
              )}
            </div>
              <Button 
              className={`bg-gradient-to-r from-[#FF512F] to-[#F09819] hover:opacity-75 text-white font-bold py-4 px-8 rounded-full transition duration-300 text-xl mt-4 mb-4 ${!product.in_stock && 'opacity-50 cursor-not-allowed'}`}
              onClick={handleAddToCart}
              disabled={!product.in_stock}
            >
              {product.in_stock ? 'Agregar al carrito' : 'Agotado'}
            </Button>
          </motion.div>
        </AnimatedSection>
      </div>
    </div>
  );
}