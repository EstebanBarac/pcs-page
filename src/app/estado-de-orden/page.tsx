'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Loader2, Package, Truck } from 'lucide-react'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

interface OrderStatus {
  id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  customer_name: string;
  customer_email: string;
  total: number;
  created_at: string;
}

export default function OrderStatusPage() {
  const [orderId, setOrderId] = useState('')
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOrderStatus = async () => {
    setLoading(true)
    setError(null)
    setOrderStatus(null)

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('id, status, customer_name, customer_email, total, created_at')
        .eq('id', orderId)
        .single()

      if (error) throw error

      if (data) {
        setOrderStatus(data as OrderStatus)
      } else {
        setError('No se encontró la orden')
      }
    } catch (err) {
      setError('Error al buscar la orden')
      console.error('Error fetching order status:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: OrderStatus['status']) => {
    switch (status) {
      case 'pending': return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      case 'processing': return <Package className="h-6 w-6 text-blue-500" />;
      case 'shipped': return <Truck className="h-6 w-6 text-purple-500" />;
      case 'delivered': return <CheckCircle className="h-6 w-6 text-green-500" />;
      default: return null;
    }
  }

  const getStatusText = (status: OrderStatus['status']) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'processing': return 'Procesando';
      case 'shipped': return 'Enviado';
      case 'delivered': return 'Entregado';
      default: return 'Desconocido';
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Estado de la Orden</CardTitle>
          <CardDescription>Ingresa el ID de tu orden para ver su estado actual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orderId">ID de la Orden</Label>
              <Input
                id="orderId"
                placeholder="Ingresa el ID de tu orden"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <Button onClick={fetchOrderStatus} disabled={loading || !orderId}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Buscar Orden'}
            </Button>
          </div>
        </CardContent>
        {error && (
          <CardFooter>
            <p className="text-red-500">{error}</p>
          </CardFooter>
        )}
        {orderStatus && (
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                {getStatusIcon(orderStatus.status)}
                <span className="text-lg font-semibold">{getStatusText(orderStatus.status)}</span>
              </div>
              <div>
                <p><strong>Cliente:</strong> {orderStatus.customer_name}</p>
                <p><strong>Email:</strong> {orderStatus.customer_email}</p>
                {/* <p><strong>Total:</strong> ${orderStatus.total.toFixed(2)}</p> */}
                <p><strong>Fecha de Orden:</strong> {new Date(orderStatus.created_at).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}