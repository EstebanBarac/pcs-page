import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Intenta crear un producto de prueba
    const product = await prisma.product.create({
      data: {
        name: 'Producto de prueba',
        description: 'Este es un producto de prueba',
        price: 99.99,
        stock: 10
      }
    })

    return NextResponse.json({ message: 'Conexión exitosa', product })
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error)
    return NextResponse.json({ error: 'Error al conectar con la base de datos' }, { status: 500 })
  }
}