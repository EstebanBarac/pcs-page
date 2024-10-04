'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

type ComponentOption = {
  name: string
  price: number
}

type ComponentType = {
  type: string
  options: ComponentOption[]
}

const components: ComponentType[] = [
  {
    type: 'CPU',
    options: [
      { name: 'Quantum Core i9', price: 599 },
      { name: 'Quantum Core i7', price: 399 },
      { name: 'Quantum Core i5', price: 299 },
    ],
  },
  {
    type: 'GPU',
    options: [
      { name: 'NeoForce RTX 4090', price: 1499 },
      { name: 'NeoForce RTX 4080', price: 1199 },
      { name: 'NeoForce RTX 4070', price: 899 },
    ],
  },
  {
    type: 'RAM',
    options: [
      { name: '64GB HyperQuantum', price: 399 },
      { name: '32GB HyperQuantum', price: 249 },
      { name: '16GB HyperQuantum', price: 129 },
    ],
  },
]

export default function PCConfigurator() {
  const [selectedComponents, setSelectedComponents] = useState<Record<string, ComponentOption>>({})

  const handleComponentChange = (type: string, option: ComponentOption) => {
    setSelectedComponents(prev => ({ ...prev, [type]: option }))
  }

  const totalPrice = Object.values(selectedComponents).reduce((sum, component) => sum + component.price, 0)

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-blue-500">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">Custom PC Configurator</h2>
      {components.map((component) => (
        <div key={component.type} className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-white">{component.type}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {component.options.map((option) => (
              <motion.button
                key={option.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded ${
                  selectedComponents[component.type]?.name === option.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300'
                }`}
                onClick={() => handleComponentChange(component.type, option)}
              >
                {option.name} - ${option.price}
              </motion.button>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-white">Total Price: ${totalPrice}</h3>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Add to Cart
      </motion.button>
    </div>
  )
}