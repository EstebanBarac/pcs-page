import Link from 'next/link'

export default function Footer() {
  return (
    <footer className=" text-white mt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Atlas Hardware</h3>
            <p className="text-gray-400">Tienda Online de Hardware en Neuquen Capital, Argentina. Envios gratis en Neuquen, consultar envios fuera de la provincia. </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Secciones</h3>
            <ul className="space-y-2">
            <li><Link href="/" className="text-gray-400 hover:text-white">Inicio</Link></li>
              <li><Link href="/categoria/pcs-nuevas-graficas-outlet" className="text-gray-400 hover:text-white">PCs Nuevas con Gráficas Outlet</Link></li>
              <li><Link href="/categoria/pcs-nuevas-rtx-40" className="text-gray-400 hover:text-white">PCs Nuevas con Placas Nuevas</Link></li>
              <li><Link href="/categoria/placas-de-video" className="text-gray-400 hover:text-white">Placas de Video</Link></li>
              <li><Link href="/categoria/perifericos" className="text-gray-400 hover:text-white">Periféricos</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contactanos</h3>
            <p className="text-gray-400">WhatsApp: (+54) 9 299-5286-048</p>
          </div>
        </div>
      </div>
    </footer>
  )
}