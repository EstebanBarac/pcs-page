'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function OutletExplanationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="font-bold text-white text-center text-4xl sm:text-5xl md:text-5xl mb-8">
          PLACAS DE{' '}
          <span className="text-[#6E3AFF]">OUTLET</span>
        </h2>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Image
            src="https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/outlet-explicacion.webp"
            alt="Placa gráfica de outlet"
            width={800}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </motion.div>

        <div className="space-y-6 text-lg">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Las placas gráficas de outlet son componentes de computadora que han sido utilizados, utilizados como muestra por diversos fabricantes o son de fin de stock. Estas placas ofrecen una excelente 
            oportunidad para obtener hardware de alto rendimiento a precios más accesibles.
          </motion.p>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-bold text-3xl mt-8 mb-4 text-amber-500"
          >
            ¿Por qué comprar una placa gráfica de outlet?
          </motion.h2>
          <motion.ul 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="list-disc pl-6 space-y-2"
          >
            <li>Precios significativamente más bajos que los modelos nuevos</li>
            <li>Rendimiento similar o idéntico a las placas nuevas</li>
            <li>Opción ideal para actualizar tu PC con un presupuesto limitado</li>
            <li>Productos revisados y garantizados</li>
          </motion.ul>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="font-bold text-3xl mt-8 mb-4 text-amber-500"
          >
            Nuestro proceso de selección
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            En nuestra tienda, todas las placas gráficas de outlet pasan por un riguroso proceso 
            de inspección y prueba utilizando inspecciones de hardware y pruebas con software especifico para pruebas de stress. Nos aseguramos de que cada componente funcione perfectamente 
            antes de ponerlo a la venta, ofreciendo así la mejor calidad a nuestros clientes.
          </motion.p>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="font-bold text-3xl mt-8 mb-4 text-amber-500"
          >
            Garantía y soporte
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Todas nuestras placas gráficas de outlet vienen con una garantía de 6 meses, 
            brindándote tranquilidad en tu compra. Además, ofrecemos soporte técnico 
            para asegurar que obtengas el máximo rendimiento de tu nueva adquisición.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-12 text-center"
        >
          <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
            <Link href="/modelos">
              Ver modelos
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}