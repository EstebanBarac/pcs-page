'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
}

export default function TestDatabase() {
  const [products, setProducts] = useState<Product[]>([])
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, stock: 0 })
  const [updateProduct, setUpdateProduct] = useState({ id: '', name: '', description: '', price: 0, stock: 0 })
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
    if (error) {
      setMessage('Error fetching products: ' + error.message)
    } else {
      setProducts(data || [])
    }
  }

  async function createProduct() {
    const { data, error } = await supabase
      .from('products')
      .insert([newProduct])
      .select()
    if (error) {
      setMessage('Error creating product: ' + error.message)
    } else {
      setMessage('Product created successfully')
      setNewProduct({ name: '', description: '', price: 0, stock: 0 })
      fetchProducts()
    }
  }

  async function updateProductById() {
    const { data, error } = await supabase
      .from('products')
      .update({ name: updateProduct.name, description: updateProduct.description, price: updateProduct.price, stock: updateProduct.stock })
      .eq('id', updateProduct.id)
      .select()
    if (error) {
      setMessage('Error updating product: ' + error.message)
    } else {
      setMessage('Product updated successfully')
      setUpdateProduct({ id: '', name: '', description: '', price: 0, stock: 0 })
      fetchProducts()
    }
  }

  async function deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    if (error) {
      setMessage('Error deleting product: ' + error.message)
    } else {
      setMessage('Product deleted successfully')
      fetchProducts()
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test Database Operations</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
          className="border p-2 mr-2"
        />
        <button onClick={createProduct} className="bg-blue-500 text-white p-2 rounded">Create Product</button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Update Product</h2>
        <input
          type="text"
          placeholder="Product ID"
          value={updateProduct.id}
          onChange={(e) => setUpdateProduct({ ...updateProduct, id: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="New Name"
          value={updateProduct.name}
          onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="New Description"
          value={updateProduct.description}
          onChange={(e) => setUpdateProduct({ ...updateProduct, description: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="New Price"
          value={updateProduct.price}
          onChange={(e) => setUpdateProduct({ ...updateProduct, price: Number(e.target.value) })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="New Stock"
          value={updateProduct.stock}
          onChange={(e) => setUpdateProduct({ ...updateProduct, stock: Number(e.target.value) })}
          className="border p-2 mr-2"
        />
        <button onClick={updateProductById} className="bg-green-500 text-white p-2 rounded">Update Product</button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Products List</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id} className="mb-2">
              {product.name} - ${product.price} - Stock: {product.stock}
              <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white p-1 rounded ml-2">Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {message && <p className="text-green-500">{message}</p>}
    </div>
  )
}