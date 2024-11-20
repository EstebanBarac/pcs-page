'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import Image from 'next/image'

interface Option {
  value: string
  label: string
  description: string
}

interface Recommendation {
  id: string
  name: string
  price: number
  discounted_price: number | null
  description: string
  image: string
  explanation: string
}

interface AdditionalRecommendation {
  id: string
  name: string
  price: number
  discounted_price: number | null
  image: string
}

const options: Option[] = [
  { value: 'gaming_budget', label: 'Gaming en presupuesto', description: 'Para jugar títulos populares con buena calidad gráfica' },
  { value: 'gaming_high', label: 'Gaming de alto rendimiento', description: 'Para jugar los últimos títulos con gráficos ultra y alto FPS' },
  { value: 'work_basic', label: 'Trabajo básico', description: 'Para tareas de oficina y navegación web' },
  { value: 'work_advanced', label: 'Trabajo avanzado', description: 'Para tareas exigentes como edición de video y diseño gráfico' },
  { value: 'streaming', label: 'Streaming', description: 'Para transmitir en vivo con alta calidad' },
  { value: 'allround_budget', label: 'Todo en uno económico', description: 'Para un uso variado sin gastar demasiado' },
  { value: 'allround_high', label: 'Todo en uno premium', description: 'Para un rendimiento excelente en todas las tareas' },
  { value: 'compact', label: 'Compacto', description: 'Para espacios reducidos sin sacrificar rendimiento' },
  { value: 'silent', label: 'Silencioso', description: 'Para un ambiente de trabajo tranquilo' },
  { value: 'future_proof', label: 'A prueba de futuro', description: 'Para quienes buscan longevidad y capacidad de actualización' },
]

const recommendations: Record<string, Recommendation> = {
  'gaming_budget': {
    id: '55',
    name: 'PC Ryzen 5 5600X-Radeon 6600XT',
    price: 1699999,
    discounted_price: 1499999,
    description: 'PC gaming de gama media con gráficos potentes para juegos populares.',
    image: 'https://hfktfenbxjrkprdmvcle.supabase.co/storage/v1/object/public/product-images/6600xt-pc-2.jpg?t=2024-11-18T23%3A46%3A08.893Z',
    explanation: 'Esta PC ofrece un excelente equilibrio entre rendimiento y precio para gaming. Con su tarjeta gráfica de gama media y procesador rápido, podrás disfrutar de la mayoría de los juegos actuales con buena calidad gráfica y tasas de FPS estables.'
  },
  // Añade aquí el resto de las recomendaciones siguiendo el mismo formato
}

const additionalRecommendations: Record<string, AdditionalRecommendation[]> = {
  'gaming_budget': [
    {
      id: '2',
      name: 'GamerPro 3500',
      price: 1800000,
      discounted_price: null,
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: '3',
      name: 'GamerPro 2500',
      price: 1200000,
      discounted_price: 1100000,
      image: '/placeholder.svg?height=200&width=200',
    }
  ],
  // Añade aquí el resto de las recomendaciones adicionales para cada opción
}

export function PCFinder() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showRecommendations, setShowRecommendations] = useState(false)

  const handleSelection = (value: string) => {
    setSelectedOption(value)
    setShowRecommendations(true)
  }

  const resetSelection = () => {
    setSelectedOption(null)
    setShowRecommendations(false)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const renderContent = () => {
    if (!showRecommendations) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4">¿Qué tipo de PC estás buscando?</h2>
          <RadioGroup onValueChange={handleSelection} className="space-y-4">
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex flex-col">
                  <span className="font-medium">{option.label}</span>
                  <span className="text-sm text-gray-500">{option.description}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </motion.div>
      )
    }

    if (selectedOption && recommendations[selectedOption]) {
      const recommendation = recommendations[selectedOption]
      const additionalRecs = additionalRecommendations[selectedOption] || []

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold mb-6">Nuestra recomendación principal para ti</h2>
          <Card className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-1/3 h-64">
                <Image
                  src={recommendation.image}
                  alt={recommendation.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex-1 p-6">
                <h3 className="text-xl font-semibold mb-2">{recommendation.name}</h3>
                <p className="text-gray-600 mb-4">{recommendation.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">¿Por qué es la mejor opción para ti?</h4>
                  <p className="text-sm text-gray-600">{recommendation.explanation}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    {recommendation.discounted_price ? (
                      <>
                        <p className="text-sm line-through text-gray-500">
                          {formatPrice(recommendation.price)}
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          {formatPrice(recommendation.discounted_price)}
                        </p>
                      </>
                    ) : (
                      <p className="text-2xl font-bold">
                        {formatPrice(recommendation.price)}
                      </p>
                    )}
                  </div>
                  <Link href={`/products/${recommendation.id}`} passHref>
                    <Button className='bg-gradient-to-r from-[#FF512F] to-[#F09819]'>Ver detalles</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>

          {additionalRecs.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mt-8 mb-4">Otras opciones que podrían interesarte</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {additionalRecs.map((rec) => (
                  <Card key={rec.id} className="overflow-hidden">
                    <div className="flex flex-col">
                      <div className="relative w-full h-48">
                        <Image
                          src={rec.image}
                          alt={rec.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-lg font-semibold mb-2">{rec.name}</h4>
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            {rec.discounted_price ? (
                              <>
                                <p className="text-sm line-through text-gray-500">
                                  {formatPrice(rec.price)}
                                </p>
                                <p className="text-xl font-bold text-green-600">
                                  {formatPrice(rec.discounted_price)}
                                </p>
                              </>
                            ) : (
                              <p className="text-xl font-bold">
                                {formatPrice(rec.price)}
                              </p>
                            )}
                          </div>
                          <Link href={`/products/${rec.id}`} passHref>
                            <Button className='bg-gradient-to-r from-[#FF512F] to-[#F09819]'>Ver detalles</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}

          <div className="flex justify-center pt-6">
            <Button onClick={resetSelection}>Comenzar de nuevo</Button>
          </div>
        </motion.div>
      )
    }

    return null
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Encuentra tu PC ideal de alto rendimiento</CardTitle>
        <CardDescription>
          Selecciona la opción que mejor se adapte a tus necesidades y te recomendaremos la mejor PC para ti
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}