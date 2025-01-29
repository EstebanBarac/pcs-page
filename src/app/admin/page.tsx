'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingCart, Users, Package } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

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
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
      
      if (ordersError) throw ordersError

      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')
      
      if (productsError) throw productsError

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

      const revenue = (orders as OrderData[]).reduce((sum, order) => sum + order.total, 0)
      const uniqueCustomers = new Set((orders as OrderData[]).map(order => order.customer_email)).size

      setTotalRevenue(revenue)
      setTotalOrders(orders?.length || 0)
      setTotalCustomers(uniqueCustomers)
      setTotalProducts(products?.length || 0)

      const salesByMonth = (orders as OrderData[]).reduce((acc, order) => {
        const month = new Date(order.created_at).toLocaleString('default', { month: 'short' })
        acc[month] = (acc[month] || 0) + order.total
        return acc
      }, {} as Record<string, number>)

      setMonthlySales(Object.entries(salesByMonth).map(([month, ventas]) => ({ month, ventas })))

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
          change: Math.random() > 0.5 ? 'up' : 'down' as 'up' | 'down'
        }))

      setTopProducts(topProductsData)

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  return (
    <ScrollArea className="h-screen">
      <div className="p-6 space-y-6 bg-white text-gray-900">
        <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ventas Mensuales</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="ventas" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Productos Más Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.sales} ventas</div>
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
    </ScrollArea>
  )
}