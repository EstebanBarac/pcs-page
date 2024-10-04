'use client'
import { useRouter } from 'next/navigation'
import { AlertTriangle } from 'lucide-react'

export default function FailedPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Pago Fallido</h1>
        <p className="text-gray-600 mb-6">
          Tu pago no pudo ser procesado. Esto puede deberse a fondos insuficientes o a un problema con tu método de pago.
        </p>
        <button
          onClick={() => router.push('/checkout')}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Intentar de Nuevo
        </button>
      </div>
    </div>
  )
}