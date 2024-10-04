'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    const orderId = searchParams.get('orderId')
    if (orderId) {
      // Fetch order details
      fetch(`/api/orders/${orderId}`)
        .then(res => res.json())
        .then(data => setOrderDetails(data))
        .catch(err => console.error('Error fetching order details:', err))
    }
  }, [searchParams])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">¡Pago Exitoso!</h1>
        {orderDetails ? (
          <div className="text-left mb-6">
            <p><strong>Número de Orden:</strong> {orderDetails.id}</p>
            <p><strong>Total:</strong> ${orderDetails.total.toFixed(2)}</p>
            <p><strong>Estado:</strong> {orderDetails.status}</p>
          </div>
        ) : (
          <p className="mb-6">Cargando detalles del pedido...</p>
        )}
        <Link href="/">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
            Volver a la tienda
          </button>
        </Link>
      </div>
    </div>
  )
}