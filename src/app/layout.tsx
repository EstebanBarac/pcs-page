'use client'

import { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import { CartProvider } from '../context/CartContext'
import Footer from '../components/Footer'
import FloatingCart from '../components/FloatingCart'
import Loader from '../components/Loader'
import './globals.css'
import { SidebarMenu } from '../components/SidebarMenu'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula un tiempo de carga
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000) // Ajusta este valor según tus necesidades

    return () => clearTimeout(timer)
  }, [])

  return (
    <html lang="es">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-r from-[#152331] to-[#000000]`}>
        <CartProvider>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="min-h-screen">
                <SidebarMenu />
                <main className="flex-grow">{children}</main>
                <Footer />
                <FloatingCart />
              </div>  
            </>
          )}
        </CartProvider>
      </body>
    </html>
  )
}