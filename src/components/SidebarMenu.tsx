import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, ShoppingCart, Headphones, CreditCard, Menu } from 'lucide-react'
import localFont from 'next/font/local'

const blanka = localFont({ src: '../../public/fonts/Blanka-Regular.otf' })

const menuItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Modelos', href: '/modelos', icon: ShoppingCart },
  { name: 'Placas de Video', href: '/placas-de-video', icon: Headphones },
  { name: 'Monitores', href: '/monitores', icon: CreditCard },
  { name: '¿Qué PC Elegir?', href: '/como-elegir', icon: CreditCard },
]

export function SidebarMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed bg-transparent border-none text-white top-4 left-4 z-50">
            <Menu className="h-[2rem] w-[2rem]" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[300px]">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )

  function SidebarContent() {
    return (
      <div className="flex h-full flex-col bg-black text-white">
        <div className="flex h-14 items-center border-b border-gray-700 px-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className={`${blanka.className} text-center text-2xl`}>NX</span>
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-2 p-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center rounded-md px-3 py-2 text-xl font-medium hover:bg-gray-700 transition-colors"
              >
                {/* <item.icon className="mr-2 h-4 w-4" /> */}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>
    )
  }
}