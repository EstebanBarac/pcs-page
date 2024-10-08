'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingCart, Users, Package } from 'lucide-react'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

interface OrderData {
  id: string;
  total: number;
  created_at: string;
  customer_email: string;
}

interface ProductData {
  id: string;
  name: string;
}

interface OrderItemData {
  quantity: number;
  products: ProductData;
}

export default function AdminDashboard() {
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalCustomers, setTotalCustomers] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)
  const [monthlySales, setMonthlySales] = useState<{ month: string; ventas: number }[]>([])
  const [topProducts, setTopProducts] = useState<{ name: string; sales: number; change: 'up' | 'down' }[]>([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    try {
      // Fetch orders
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
      
      if (ordersError) throw ordersError

      // Fetch products
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')
      
      if (productsError) throw productsError

      // Fetch order items with product information
      const { data: orderItems, error: orderItemsError } = await supabase
        .from('order_items')
        .select(`
          quantity,
          products (
            id,
            name
          )
        `)
      
      if (orderItemsError) throw orderItemsError

      // Calculate metrics
      const revenue = (orders as OrderData[]).reduce((sum, order) => sum + order.total, 0)
      const uniqueCustomers = new Set((orders as OrderData[]).map(order => order.customer_email)).size

      setTotalRevenue(revenue)
      setTotalOrders(orders?.length || 0)
      setTotalCustomers(uniqueCustomers)
      setTotalProducts(products?.length || 0)

      // Calculate monthly sales
      const salesByMonth = (orders as OrderData[]).reduce((acc, order) => {
        const month = new Date(order.created_at).toLocaleString('default', { month: 'short' })
        acc[month] = (acc[month] || 0) + order.total
        return acc
      }, {} as Record<string, number>)

      setMonthlySales(Object.entries(salesByMonth).map(([month, ventas]) => ({ month, ventas })))

      // Calculate top products
      const productSales = (orderItems as unknown as OrderItemData[]).reduce((acc, item) => {
        const productId = item.products.id
        const productName = item.products.name
        if (!acc[productId]) {
          acc[productId] = { name: productName, sales: 0 }
        }
        acc[productId].sales += item.quantity
        return acc
      }, {} as Record<string, { name: string; sales: number }>)

      const topProductsData = Object.values(productSales)
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5)
        .map(product => ({
          ...product,
          change: Math.random() > 0.5 ? 'up' : 'down' as 'up' | 'down' // Simulated change, replace with real data if available
        }))

      setTopProducts(topProductsData)

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  return (
    <div className="min-h-screen  text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard Administrativo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-white">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-white">Pedidos</CardTitle>
            <ShoppingCart className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalOrders.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-white">Clientes</CardTitle>
            <Users className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalCustomers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-white">Productos</CardTitle>
            <Package className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalProducts}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gray-900">
          <CardHeader>
            <CardTitle className='text-white text-2xl'>Ventas Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  labelStyle={{ color: '#F3F4F6' }}
                />
                <Bar dataKey="ventas" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-900">
          <CardHeader>
            <CardTitle className='text-white'>Productos Más Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-1">
                    <div className="text-xl font-medium text-slate-400">{product.name}</div>
                    <div className="text-md text-slate-500">{product.sales} ventas</div>
                  </div>
                  <div className={`text-sm font-medium ${product.change === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {product.change === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}