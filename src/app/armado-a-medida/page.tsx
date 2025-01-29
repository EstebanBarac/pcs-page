'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Check, BarChart3 } from 'lucide-react'

interface Component {
  id: string
  name: string
  description: string
  image: string
}

interface ComponentCategory {
  id: string
  title: string
  description: string
  selected: Component | null
  options: Component[]
}

const initialCategories: ComponentCategory[] = [
  {
    id: 'chassis',
    title: 'GABINETE',
    description: 'Elija su gabinete',
    selected: null,
    options: [
      { id: '4000DWhite', name: 'Corsair 4000D White', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/4000D-white.avif?t=2025-01-24T20%3A30%3A59.992Z' },
      { id: '4000DBlack', name: 'Corsair 4000D Black ', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/4000D-black.avif?t=2025-01-24T20%3A31%3A11.250Z' },
      { id: '3500XBlack', name: 'Corsair 3500X Black ', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/3500X_black.avif' },// Add more chassis options
      { id: '3500XWhite', name: 'Corsair 3500X White ', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/3500x-white.avif' },
      { id: 'GT502', name: 'ASUS TUF GT 502 ', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/gt-502.png' },
    
    ]
  },
  {
    id: 'graphics',
    title: 'GPU',
    description: '',
    selected: null,
    options: [
      { id: 'rtx4060', name: 'NVIDIA GEFORCE RTX 4060', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/4060-1.png?t=2025-01-24T20%3A44%3A41.805Z' },
      { id: 'rtx4070', name: 'NVIDIA GEFORCE RTX 4070 SUPER', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/4070-2.webp' },
      { id: 'rtx4080', name: 'NVIDIA GEFORCE RTX 4080 SUPER', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/4080-1.png' },
      { id: 'rtx4090', name: 'NVIDIA GEFORCE RTX 4090', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/4090-2.webp' },
      // Add more GPU options
    ]
  },
  {
    id: 'processor',
    title: 'CPU',
    description: '',
    selected: null,
    options: [
      { id: 'ryzen-5-7600x', name: 'AMD RYZEN 5 7600X', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/7600X-2.png' },
      { id: 'ryzen-7-7700x', name: 'AMD RYZEN 7 7700X', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/7700X-2.png' },
      { id: 'ryzen-9-9900x', name: 'AMD RYZEN 9 9900X', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/9900x-2.webp' },
      { id: 'ryzen-7-9800x3d', name: 'AMD RYZEN 7 9800X3D', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/9800x3d-2.webp' },
      // Add more CPU options
    ]
  },
  {
    id: 'motherboard',
    title: 'MOTHERBOARD',
    description: '',
    selected: null,
    options: [
      { id: 'ASUS PRIME B650M-A WIFI II DDR5 AM5', name: 'ASUS PRIME B650M-A WIFI II DDR5 AM5', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/B650.png?t=2025-01-24T23%3A46%3A04.874Z' },
      { id: 'ASUS TUF GAMING B850-PLUS WIFI DDR5 AM5', name: 'ASUS TUF GAMING B850-PLUS WIFI DDR5 AM5', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/B850-TUF.webp' },
      { id: 'ASUS PRIME X870-P WIFI DDR5 AM5', name: 'ASUS PRIME X870-P WIFI DDR5 AM5', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/X870-prime.webp' },
      { id: 'ASUS ROG STRIX B850-E GAMING WIFI DDR5 AM5', name: 'ASUS ROG STRIX B850-E GAMING WIFI DDR5 AM5', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/B850-E.png' },
     // Add more CPU options
    ]
  },
  {
    id: 'ram',
    title: 'MEMORIA RAM',
    description: '.',
    selected: null,
    options: [
      { id: '32GB DDR5', name: '32 GB DDR5 6000 mh/z', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/Fury-ddr5.webp' },
      { id: '64GB DDR5', name: '64 GB DDR5 6000 mh/z', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/Fury-ddr5.webp' },
      { id: '128GB DDR5', name: '128 GB DDR5 6200 mh/z', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/corsair-ddr5.avif' },
      // Add more CPU options
    ]
  },
  {
    id: 'cooling',
    title: 'ENFRIAMIENTO',
    description: '',
    selected: null,
    options: [
      { id: 'Hyper212', name: 'Hyper 212 Sylent Air Cpu Cooler', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/Hyper-212.webp?t=2025-01-24T23%3A57%3A20.223Z' },
      { id: 'Watercooling240', name: 'Watercooling AIO 240MM', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/atmos-240.webp?t=2025-01-24T23%3A57%3A35.502Z' },
      { id: 'Watercooling360', name: 'Watercooling AIO 360MM', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/atmos-360.png?t=2025-01-24T23%3A57%3A43.989Z' },
      { id: 'Watercoolingcustom', name: 'Refrigeracion Liquida armada a  medida', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/liquida-a-medida.webp?t=2025-01-24T23%3A57%3A09.435Z' },
      // Add more CPU options
    ]
  },
  {
    id: 'psu',
    title: 'FUENTE',
    description: '',
    selected: null,
    options: [
      { id: '750W PLUS GOLD', name: '750W PLUS GOLD', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/750w.webp?t=2025-01-25T00%3A01%3A30.039Z' },
      { id: '850W PLUS GOLD', name: '850W PLUS GOLD', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/850w.webp?t=2025-01-25T00%3A01%3A38.657Z' },
      { id: '1000W PLUS GOLD', name: '1000W PLUS GOLD', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/1000w.png?t=2025-01-25T00%3A01%3A14.684Z' },
      // Add more CPU options
    ]
  },
  {
    id: 'nvme1',
    title: 'NVME M.2 SLOT 1',
    description: '',
    selected: null,
    options: [
      { id: '1TB nvme gen3', name: '1 TB Nvme gen3', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/NVME.png' },
      { id: '1TB nvme gen4', name: '1 TB Nvme gen4', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/NVME.png' },
      { id: '2TB nvme gen4', name: '2 TB Nvme gen4', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/NVME.png' }, // // Add more CPU options
      { id: '4TB nvme gen4', name: '4 TB Nvme gen3', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/NVME.png' },
    ]
  },
  {
    id: 'nvme2',
    title: 'NVME M.2 SLOT 2',
    description: 'The core of a seamless gaming performance is in your processor. Gamers want high core clock speeds, while creatives and workstation users want cores, threads, and high clock speeds.',
    selected: null,
    options: [
      { id: '1TB nvme gen3', name: '1 TB Nvme gen3', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/NVME.png' },
      { id: '1TB nvme gen4', name: '1 TB Nvme gen4', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/NVME.png' },
      { id: '2TB nvme gen4', name: '2 TB Nvme gen4', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/NVME.png' }, // // Add more CPU options
      { id: '4TB nvme gen4', name: '4 TB Nvme gen4', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/NVME.png' },
    ]
  },
  {
    id: 'ssd1',
    title: 'SSD SLOT 1',
    description: '',
    selected: null,
    options: [
      { id: '256gb SSD', name: '256GB SSD', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/satassd.png?t=2025-01-25T00%3A10%3A13.526Z' },
      { id: '500gb SSD', name: '500GB SSD', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/satassd.png?t=2025-01-25T00%3A10%3A13.526Z' },
      { id: '1TB SSD', name: '1TB SSD', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/satassd.png?t=2025-01-25T00%3A10%3A13.526Z' },
      { id: '1TB HDD', name: '1TB HDD', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/hdd.png?t=2025-01-25T00%3A09%3A50.597Z' },
      { id: '2TB HDD', name: '2TB HDD', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/hdd.png?t=2025-01-25T00%3A09%3A50.597Z' },
      { id: '4TB HDD', name: '4TB HDD', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/hdd.png?t=2025-01-25T00%3A09%3A50.597Z' },
      
      // Add more CPU options
    ]
  },
  {
    id: 'ssd2',
    title: 'SSD SLOT 2',
    description: 'The core of a seamless gaming performance is in your processor. Gamers want high core clock speeds, while creatives and workstation users want cores, threads, and high clock speeds.',
    selected: null,
    options: [
      { id: '256gb SSD', name: '256GB SSD', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/satassd.png?t=2025-01-25T00%3A10%3A13.526Z' },
      { id: '500gb SSD', name: '500GB SSD', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/satassd.png?t=2025-01-25T00%3A10%3A13.526Z' },
      { id: '1TB SSD', name: '1TB SSD', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/satassd.png?t=2025-01-25T00%3A10%3A13.526Z' },
      { id: '1TB HDD', name: '1TB HDD', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/hdd.png?t=2025-01-25T00%3A09%3A50.597Z' },
      { id: '2TB HDD', name: '2TB HDD', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/hdd.png?t=2025-01-25T00%3A09%3A50.597Z' },
      { id: '4TB HDD', name: '4TB HDD', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/hdd.png?t=2025-01-25T00%3A09%3A50.597Z' },
      // Add more CPU options
    ]
  },
  {
    id: 'windows',
    title: 'SISTEMA OPERATIVO',
    description: '',
    selected: null,
    options: [
      { id: 'win11', name: 'Windows 11', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/win.webp' },
      { id: 'nada', name: 'Sin Sistema operativo', description: '', image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/x.png' },
      // Add more CPU options
    ]
  },
  // Add more categories (motherboard, memory, etc.)
]

export default function PCBuilder() {
    const [activeTab, setActiveTab] = useState('components')
    const [categories, setCategories] = useState(initialCategories)
    const [modalOpen, setModalOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState<ComponentCategory | null>(null)
    const [customNotes, setCustomNotes] = useState('')

  const handleEdit = (category: ComponentCategory) => {
    setActiveCategory(category)
    setModalOpen(true)
  }

  const handleSelect = (component: Component) => {
    if (!activeCategory) return

    setCategories(categories.map(cat => 
      cat.id === activeCategory.id 
        ? { ...cat, selected: component }
        : cat
    ))
    setModalOpen(false)
  }

  const handleSubmit = async () => {
    const configuration = {
      components: categories.map(cat => ({
        category: cat.title,
        selected: cat.selected?.name || 'Not selected'
      })),
      customNotes,
      timestamp: new Date().toISOString()
    }

    // Here you could send this to your email, API, or database
    console.log('Configuration:', configuration)
    
    // Example: Send to an API endpoint
    try {
      const response = await fetch('/api/submit-build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(configuration),
      })
      
      if (response.ok) {
        alert('¡Tu configuración ha sido enviada con éxito!')
      } else {
        throw new Error('Error al enviar la configuración')
      }
    } catch (error) {
      alert('Hubo un error al enviar tu configuración. Por favor, intenta nuevamente.')
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0B1F] text-white">
      {/* Header Tabs */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold py-8">PERSONALICE SU PC</h1>
          <div className="flex gap-4">
            <Button
              variant={activeTab === 'components' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('components')}
              className={activeTab === 'components' ? 'bg-amber-600' : ''}
            >
              COMPONENTES
            </Button>
            <Button
              variant={activeTab === 'customizations' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('customizations')}
            >
              PERSONALIZACION
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'components' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-gradient-to-b from-gray-900 to-[#1A1731] rounded-lg overflow-hidden"
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-center mb-4">
                    <BarChart3 className="h-8 w-8 text-gray-600" />
                  </div>
                  <div className="text-center flex-grow">
                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-gray-500 text-sm mb-4">
                      {category.selected ? category.selected.name : 'No selection'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEdit(category)}
                    className="w-full mt-4 group"
                  >
                    <div className="flex items-center justify-center">
                      <div className="bg-gray-800 group-hover:bg-amber-700 rounded-sm transition-colors flex items-center justify-center px-6 py-2">
                        <span className="text-sm">SELECCIONAR</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'customizations' && (
          <div className="bg-gradient-to-b from-gray-900 to-[#1A1731] rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Notas/Preferencias</h3>
            <Textarea
              placeholder="Describa cualquier requerimiento para su armado, por ejemplo full black, full white, gpu vertical, etc. "
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="min-h-[200px] bg-gray-800 border-gray-700"
            />
            <h3 className="mt-4 text-xl font-bold mb-4">Contacto</h3>
            <Textarea
              placeholder="Ingrese su contacto, número de telefono, email, discord, etc."
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="min-h-[80px] bg-gray-800 border-gray-700"
            />
            <Button 
              className="w-full mt-4 bg-amber-600 hover:bg-amber-700"
              onClick={handleSubmit}
            >
              ENVIAR Y PRESUPUESTAR
            </Button>
          </div>
        )}
      </div>

      {/* Component Selection Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-auto bg-gray-900 text-white p-0">
          <DialogHeader className="sticky top-0 bg-gray-900 p-6 border-b border-gray-800">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-2xl font-bold">
                  {activeCategory?.title}
                </DialogTitle>
                <p className="text-gray-400">{activeCategory?.description}</p>
              </div>
              {/* <Button
                variant="ghost"
                onClick={() => setModalOpen(false)}
                className="hover:bg-gray-800"
              >
                <X className="h-6 w-6" />
              </Button> */}
            </div>
          </DialogHeader>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {activeCategory?.options.map((component) => (
                <button
                  key={component.id}
                  onClick={() => handleSelect(component)}
                  className={`relative bg-gray-800 rounded-lg p-4 text-left transition-colors
                    ${activeCategory.selected?.id === component.id ? 'ring-2 ring-amber-600' : 'hover:bg-gray-700'}`}
                >
                  <div className="aspect-square relative mb-4">
                    <Image
                      src={component.image || "/placeholder.svg"}
                      alt={component.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <h4 className="font-bold">{component.name}</h4>
                  <p className="text-sm text-gray-400">{component.description}</p>
                  {activeCategory.selected?.id === component.id && (
                    <div className="absolute top-2 right-2 bg-amber-600 rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}