import React from 'react';
import { ArrowRight, Cpu, Zap, DollarSign, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const ImprovedHomepageSection: React.FC = () => {
  return (
    <div className=" mt-24 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text">
          ¿Qué hacemos?
        </h2>
        
        <p className="text-xl text-center mb-12 max-w-6xl mx-auto">
        Ofrecemos computadoras de alta gama. Nos especializamos en equipos potentes y configuraciones a medida, utilizando componentes de primera línea como gráficas RTX series 30 y 40 con procesadores de última generación, tambien ofrecemos periféricos de primera línea. Nuestro objetivo es brindarte tecnología de alta calidad a precios competitivos asegurandote el mejor presupuesto/rendimiento posible.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-r from-[#ff522fd6] to-[#f09619c6] rounded-lg p-6 shadow-lg transform transition duration-500 hover:scale-105">
            <h3 className="text-2xl font-bold mb-4">Nuestra Solución</h3>
            <p className='text-lg'>
              En nuestra tienda, entendemos que el costo de las placas de video de alta gama ha alcanzado precios elevados. 
              Para solucionar esto, hemos desarrollado una alternativa: nuestras computadoras nuevas incluyen placas de video 
              outlet certificadas, lo que nos permite reducir los costos significativamente sin comprometer la calidad ni el rendimiento.
            </p>
          </div>
          <div className="bg-gradient-to-l from-[#ff522fd6] to-[#f09619c6] rounded-lg p-6 shadow-lg transform transition duration-500 hover:scale-105">
            <h3 className="text-2xl font-bold mb-4">Beneficios</h3>
            <p className='text-lg'>
              Con esta solución, logramos que el precio final de nuestras PCs se reduzca hasta la mitad en comparación 
              con equipos que usan tarjetas completamente nuevas, ahorrando millones de pesos. Así, te brindamos una 
              excelente oportunidad para acceder a la tecnología más avanzada a un costo mucho más accesible.
            </p>
          </div>
        </div>

        <div className="mt-24 text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text">
            ¿Qué son las placas de Outlet?
          </h2>
          <p className="text-xl max-w-6xl mx-auto">
            Nuestras gráficas de outlet son placas de video Nvidia RTX series 30 que han sido usadas durante 
            cortos períodos de tiempo y han pasado por un riguroso proceso de certificación para garantizar su 
            perfecto funcionamiento.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { icon: Cpu, text: "Componentes de última generación" },
            { icon: Zap, text: "Alto rendimiento garantizado" },
            { icon: DollarSign, text: "Precios competitivos" },
            { icon: HelpCircle, text: "Asesoramiento experto" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center bg-gray-800 rounded-lg p-6 shadow-lg transform transition duration-500 hover:scale-105">
              <item.icon className="h-12 w-12 text-amber-600 mb-4" />
              <p className="text-center font-medium">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/categoria/pcs-nuevas-graficas-outlet"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-[#FF512F] to-[#F09819] hover:bg-orange-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Ver modelos con placas Outlet
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImprovedHomepageSection;