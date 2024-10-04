'use client'
import { useRouter } from 'next/navigation'
import { Clock } from 'lucide-react'

export default function PendingPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Pago Pendiente</h1>
        <p className="text-gray-600 mb-6">
          Tu pago está siendo procesado. Esto puede tomar unos minutos. Por favor, no cierres esta página.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Te enviaremos un correo electrónico con la confirmación una vez que el pago se haya completado.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => router.push('/order-status')}
            className="w-full bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Verificar Estado del Pedido
          </button>
          <button
            onClick={() => router.push('/')}
            className="w-full px-6 py-2 rounded-full transition duration-300"
          >
            Volver a la Tienda
          </button>
        </div>
      </div>
    </div>
  )
}