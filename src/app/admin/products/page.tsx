'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { toast, Toaster } from 'react-hot-toast'

interface Product {
  id: string
  name: string
  description_primera: string
  price: number
  images: { url: string }[];
  category_id: number
  shortdescription: string
  description_segunda: string
  spec_mother: string
  spec_procesador: string
  spec_grafica: string
  spec_refrigeracion: string
  spec_fuente: string
  spec_almacenamiento: string
  spec_ram: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching products:', error)
      toast.error('Error al cargar los productos')
    } else {
      setProducts(data || [])
    }
  }

  async function createOrUpdateProduct(product: Partial<Product>) {
    const { error } = await supabase
      .from('products')
      .upsert([product])
      .select()

    if (error) {
      console.error('Error creating/updating product:', error)
      toast.error('Error al guardar el producto')
    } else {
      toast.success('Producto guardado exitosamente')
      fetchProducts()
      setIsDialogOpen(false)
    }
  }

  async function deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting product:', error)
      toast.error('Error al eliminar el producto')
    } else {
      toast.success('Producto eliminado exitosamente')
      fetchProducts()
    }
  }

  const ProductForm = ({ product }: { product: Partial<Product> }) => (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            value={product.name || ''}
            onChange={(e) => setEditingProduct({ ...product, name: e.target.value } as Product)}
          />
        </div>
        <div>
          <Label htmlFor="shortdescription">Descripción Corta</Label>
          <Textarea
            id="shortdescription"
            value={product.shortdescription || ''}
            onChange={(e) => setEditingProduct({ ...product, shortdescription: e.target.value } as Product)}
          />
        </div>
        <div>
          <Label htmlFor="price">Precio</Label>
          <Input
            id="price"
            type="number"
            value={product.price || ''}
            onChange={(e) => setEditingProduct({ ...product, price: Number(e.target.value) } as Product)}
          />
        </div>
        <div>
          <Label htmlFor="category_id">Categoría ID</Label>
          <Input
            id="category_id"
            type="number"
            value={product.category_id || ''}
            onChange={(e) => setEditingProduct({ ...product, category_id: Number(e.target.value) } as Product)}
          />
        </div>
        <div>
          <Label htmlFor="description_primera">Descripción Primera</Label>
          <Textarea
            id="description_primera"
            value={product.description_primera || ''}
            onChange={(e) => setEditingProduct({ ...product, description_primera: e.target.value } as Product)}
          />
        </div>
        <div>
          <Label htmlFor="description_segunda">Descripción Segunda</Label>
          <Textarea
            id="description_segunda"
            value={product.description_segunda || ''}
            onChange={(e) => setEditingProduct({ ...product, description_segunda: e.target.value } as Product)}
          />
        </div>
        {/* Add more fields for specs */}
        {['mother', 'procesador', 'grafica', 'refrigeracion', 'fuente', 'almacenamiento', 'ram'].map((spec) => (
          <div key={spec}>
            <Label htmlFor={`spec_${spec}`}>{`Spec ${spec}`}</Label>
            <Input
                id={`spec_${spec}`}
                value={(() => {
                  const val = product[`spec_${spec}` as keyof Product];
                  return Array.isArray(val) ? JSON.stringify(val) : val || '';
                })()}
                onChange={(e) =>
                  setEditingProduct({ ...product, [`spec_${spec}`]: e.target.value } as Product)
                }
              />
          </div>
        ))}
      </div>
    </ScrollArea>
  )

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Administrar Productos</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingProduct({} as Product)}>
                <Plus className="mr-2 h-4 w-4" /> Añadir Producto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingProduct?.id ? 'Editar' : 'Añadir'} Producto</DialogTitle>
              </DialogHeader>
              <ProductForm product={editingProduct || {}} />
              <Button onClick={() => createOrUpdateProduct(editingProduct!)}>
                Guardar
              </Button>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {product.name}
                  <div>
                    <Button variant="ghost" size="icon" onClick={() => {
                      setEditingProduct(product)
                      setIsDialogOpen(true)
                    }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteProduct(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {product.images && product.images.length > 0 && (
                  <img src={product.images[0]?.url || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
                )}
                <p className="text-sm text-gray-600 mb-2">{product.shortdescription}</p>
                <p className="font-bold text-gray-900">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-600">Categoría: {product.category_id}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}