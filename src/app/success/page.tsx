'use client'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">¡Pago Exitoso!</h1>
        <p className="mb-6">Una vez procesado el pago se le enviara por mail la informacion</p>
        <Link href="/">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
            Volver a la tienda
          </button>
        </Link>
      </div>
    </div>
  )
}