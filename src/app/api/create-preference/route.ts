import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { createClient } from '@supabase/supabase-js'
import { sendTelegramNotification } from '@/lib/telegramNotifier'

// Definir interfaces para los tipos
interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface RequestBody {
  items: Item[];
  totalAmount: number;
  customerInfo: CustomerInfo;
}

if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
  throw new Error('MERCADO_PAGO_ACCESS_TOKEN is not defined')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Supabase environment variables are not defined')
}

if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
  throw new Error('Telegram environment variables are not defined')
}

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json()
    const { items, totalAmount, customerInfo } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 })
    }

    const preference = new Preference(client)

    const preferenceData = {
      items: items.map((item: Item) => ({
        id: item.id,
        title: item.name,
        unit_price: Number(item.price),
        quantity: Number(item.quantity),
      })),
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/failed`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/pending`,
      },
      auto_return: 'approved' as const,
    }

    const result = await preference.create({ body: preferenceData })

    // Create order in Supabase
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        address: customerInfo.address,
        status: 'PENDING',
        total: totalAmount,
      })
      .select()
      .single()

    if (orderError) {
      throw new Error(`Error creating order: ${orderError.message}`)
    }

    // Create order items in Supabase
    const orderItems = items.map((item: Item) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      throw new Error(`Error creating order items: ${itemsError.message}`)
    }

    // Send Telegram notification
    await sendTelegramNotification({
      id: order.id,
      customer_name: customerInfo.name,
      customer_email: customerInfo.email,
      customer_phone: customerInfo.phone,
      address: customerInfo.address,
      total: totalAmount,
      items: preferenceData.items
    })

    return NextResponse.json({ id: result.id, orderId: order.id })
  } catch (error) {
    console.error('Error in create-preference:', error)
    return NextResponse.json({ error: 'Error creating preference and order' }, { status: 500 })
  }
}