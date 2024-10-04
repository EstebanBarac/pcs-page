'use client'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import Script from 'next/script'
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export default function MercadoPagoCheckout() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [preferenceId, setPreferenceId] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    })
  }

  const isFormValid = () => {
    return Object.values(customerInfo).every(value => value.trim() !== '')
  }

  const createPreference = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          items, 
          totalAmount: totalPrice,
          customerInfo
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create preference')
      }
      setPreferenceId(data.id)
      setOrderId(data.orderId)
    } catch (err) {
      console.error('Error creating preference:', err)
      setError('Error al crear la preferencia de pago. Por favor, intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (preferenceId && window.MercadoPago) {
      const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!, {
        locale: 'es-AR'
      })

      mp.checkout({
        preference: {
          id: preferenceId
        },
        render: {
          container: '.cho-container',
          label: 'Realizar el Pago',
        },
        callbacks: {
          onSubmit: () => {
            clearCart()
            router.push(`/success?orderId=${orderId}`)
          }
        }
      })
    }
  }, [preferenceId, orderId, clearCart, router])

  function formatPrice(price: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-white shadow-lg rounded-lg max-w-md mx-auto p-6 space-y-6">
      <Script 
        src="https://sdk.mercadopago.com/js/v2" 
        strategy="lazyOnload"
      />
      <h2 className="text-2xl font-bold text-gray-800">Información de Envío y contacto</h2>
      <form onSubmit={(e) => { e.preventDefault(); createPreference(); }} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Nombre completo</label>
          <input
            id="name"
            type="text"
            name="name"
            value={customerInfo.name}
            onChange={handleInputChange}
            required
            className="mt-1 block p-2 w-full rounded-md border border-gray-400 shadow-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Correo electrónico</label>
          <input
            id="email"
            type="email"
            name="email"
            value={customerInfo.email}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 text-black block w-full rounded-md border border-gray-400 shadow-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Teléfono</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={customerInfo.phone}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 text-black block w-full rounded-md border border-gray-400 shadow-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-lg font-medium text-gray-700">Dirección de envío</label>
          <input
            id="address"
            type="text"
            name="address"
            value={customerInfo.address}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 text-black block w-full rounded-md border border-gray-400 shadow-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button 
          type="submit" 
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-gradient-to-r from-[#FF512F] to-[#F09819] hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 ${(!isFormValid() || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isFormValid() || loading}
        >
          {loading ? 'Procesando...' : 'Continuar'}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Resumen de la compra</h2>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600">{item.name} x{item.quantity}</span>
              <span className="font-medium">${formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="flex justify-between font-bold text-black">
            <span className='text-xl'>Total:</span>
            <span className='text-xl'>${formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {preferenceId && (
      <div className="mt-6">
        <div className='cho-container flex justify-center items-center'></div>
        </div>
      )}
    </div>
  )
}