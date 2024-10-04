import Link from 'next/link'

export default function Footer() {
  return (
    <footer className=" text-white mt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">¿Que hacemos?</h3>
            <p className="text-gray-400">Premium Tech offers high-end custom PCs and top-tier peripherals for the most demanding users.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Secciones</h3>
            <ul className="space-y-2">
            <li><Link href="/" className="text-gray-400 hover:text-white">Volver al Inicio</Link></li>
              <li><Link href="/categoria/pcs-nuevas-graficas-outlet" className="text-gray-400 hover:text-white">PCs Nuevas con Gráficas Outlet</Link></li>
              <li><Link href="/categorias/pcs-nuevas" className="text-gray-400 hover:text-white">PCs Nuevas con Placas Nuevas</Link></li>
              <li><Link href="/monitors" className="text-gray-400 hover:text-white">Placas de Video</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Periféricos</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contactanos</h3>
            <p className="text-gray-400">Email: atlasstore14@gmail.com</p>
            <p className="text-gray-400">WhatsApp: (+54) 9 299-5286-048</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Atlas Hardware. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}