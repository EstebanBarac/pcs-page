import { InfoIcon } from 'lucide-react'

export default function OutletExplanation() {
  return (
    <section className=" py-8 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start justify-between space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text mb-4">¿Qué son las placas de outlet?</h2>
            <p className="text-white text-lg md:text-xl">
              Nuestras gráficas de outlet son placas de video Nvidia RTX series 30 que han sido usadas durante uno o dos años para gaming. A cada una de estas placas les realizamos pruebas exhaustivas, como Unigine Heaven 4.0 y 3DMark, para asegurarnos de que funcionen perfectamente y no presenten pérdida de rendimiento. Nos aseguramos de que todas las tarjetas estén en un estado estimado del 95%-100% de su capacidad original, sin defectos de rendimiento ni problemas de temperatura.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm">
              <InfoIcon className="w-8 h-8 sm:w-12 sm:h-12 text-amber-600 mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">Ventajas placas outlet:</h3>
              <ul className="list-disc list-inside text-gray-600 text-base sm:text-lg">
                <li>Precio único</li>
                <li>Rendimiento similar a las nuevas</li>
                <li>Probadas y certificadas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}