'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { ChevronDown, ChevronUp, Package, Truck, CheckCircle, AlertCircle } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast, Toaster } from 'react-hot-toast'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
  };
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  created_at: string;
  items: OrderItem[];
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(
          *,
          product:products(name)
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching orders:', error)
      toast.error('Error al cargar las órdenes')
    } else {
      setOrders(data || [])
    }
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  }

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)

    if (error) {
      console.error('Error updating order status:', error)
      toast.error('Error al actualizar el estado de la orden')
    } else {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
      toast.success('Estado de la orden actualizado')
    }
  }

  return (
    <div className="min-h-screen  text-gray-100">
      <Toaster position="top-right" />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Órdenes de Compra</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <div 
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleOrderExpansion(order.id)}
              >
                <div className="flex items-center space-x-4">
                  <span className={`${getStatusColor(order.status)} p-2 rounded-full`}>
                    {getStatusIcon(order.status)}
                  </span>
                  <div>
                    <p className="font-semibold">{order.customer_name}</p>
                    <p className="text-sm text-gray-400">{order.customer_email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-bold text-green-500">{formatPrice(order.total)} ARS</p>
                  <p className="text-sm text-gray-400">{new Date(order.created_at).toLocaleString()}</p>
                  {expandedOrder === order.id ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>
              {expandedOrder === order.id && (
                <div className="p-4 border-t border-gray-700">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Teléfono</p>
                      <p>{order.customer_phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Dirección</p>
                      <p>{order.address}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-400 mb-2">Estado de la orden</p>
                      <Select
                        value={order.status}
                        onValueChange={(value) => updateOrderStatus(order.id, value as Order['status'])}
                      >
                        <SelectTrigger className="w-32 bg-slate-800">
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendiente</SelectItem>
                          <SelectItem value="processing">Pago</SelectItem>
                          <SelectItem value="shipped">Enviado</SelectItem>
                          <SelectItem value="delivered">Entregado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">Productos</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-400">
                        <th className="pb-2">Producto</th>
                        <th className="pb-2">Cantidad</th>
                        <th className="pb-2">Precio</th>
                        <th className="pb-2">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item.id}>
                          <td className="py-1">{item.product.name}</td>
                          <td className="py-1">{item.quantity}</td>
                          <td className="py-1">${item.price.toFixed(2)}</td>
                          <td className="py-1">${(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}