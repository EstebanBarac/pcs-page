import { Instagram, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className=" text-white mt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Noxus Hardware</h3>
            <p className="text-gray-400">Tienda Online de Hardware y armado de computadoras a medida en Neuquen Capital, Argentina. Envios gratis en Neuquen, consultar envios fuera de la provincia. </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Secciones</h3>
            <ul className="space-y-2">
            <li><Link href="/" className="text-gray-400 hover:text-white">Inicio</Link></li>
              <li><Link href="/modelos" className="text-gray-400 hover:text-white">Modelos</Link></li>
              <li><Link href="/placas-de-video" className="text-gray-400 hover:text-white">Placas de Video</Link></li>
              <li><Link href="/monitores" className="text-gray-400 hover:text-white">Monitores</Link></li>
              <li><Link href="/como-elegir" className="text-gray-400 hover:text-white">¿Qué PC Elegir?</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contactanos</h3>
            <Link 
              href="https://wa.me/5492995286048" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-gray-400  hover:text-white transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>WhatsApp: 2995286048</span>
            </Link>
            <Link 
              href="https://www.instagram.com/noxuspc_/profilecard/?igsh=NDdxY3NuaDB4NHVi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex mt-4 items-center text-lg text-gray-400 hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5 mr-2" />
              <span>@noxuspc_</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}