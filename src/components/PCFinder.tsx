'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import Image from 'next/image'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface Option {
  value: string
  label: string
  description: string
  mainRecommendationId: string
  additionalRecommendationIds: string[]
  explanation: string
}

interface Product {
  id: string
  name: string
  price: number
  discounted_price: number | null
  shortdescription: string
  images: { url: string }[]
}

const options: Option[] = [
  {
    value: 'gaming_budget',
    label: 'Gaming Competitivo (1080p, 144hz)',
    description: 'Para jugar títulos populares con buena calidad gráfica y FPS altos.',
    mainRecommendationId: '1',
    additionalRecommendationIds: ['55', '5'],
    explanation: 'Esta PC está diseñada para jugadores exigentes que buscan el máximo rendimiento en títulos competitivos. Gracias al procesador Ryzen 5 5600X, disfrutarás de tiempos de respuesta ultra rápidos y multitarea fluida. La RTX 3070 Outlet certificada proporciona gráficos excepcionales para aprovechar al máximo los 144Hz, asegurando que no pierdas ni un frame en tu próxima partida. Ideal para juegos como CS2, Valorant y Fortnite.'
  },
  {
    value: 'gaming_high',
    label: 'Gaming inmersivo (1440p, Ultra Settings)',
    description: 'Para jugar los últimos títulos con gráficos ultra.',
    mainRecommendationId: '56',
    additionalRecommendationIds: ['5', '24'],
    explanation: 'Si buscas un equilibrio entre calidad visual y rendimiento, esta configuración es ideal. Con el potente Ryzen 5 5700X y la Radeon 7700XT, esta PC garantiza una experiencia de juego fluida en 1440p, con ajustes gráficos al máximo y sin sacrificar fotogramas por segundo. Perfecta para disfrutar de títulos AAA como Cyberpunk 2077 y The Witcher 3 en todo su esplendor visual. Además, su capacidad de actualización asegura que estarás listo para futuros lanzamientos.'
  },
  {
    value: 'gaming_streaming',
    label: 'Streaming y Gaming (1080p/1440p)',
    description: 'Para jugar y stremear sin inconvenientes',
    mainRecommendationId: '5',
    additionalRecommendationIds: ['2', '25'],
    explanation: 'Esta PC combina potencia y eficiencia para ofrecerte un equipo listo para streaming y gaming de alto nivel. El procesador Intel i9 10900 maneja múltiples tareas con facilidad, permitiéndote transmitir en vivo sin interrupciones mientras juegas en calidad ultra. La RTX 3090 Outlet certificada no solo asegura gráficos impresionantes, sino también un rendimiento robusto para tareas como la codificación de video. Ya sea que transmitas en Twitch o crees contenido en YouTube, esta configuración te respalda.'
  },
  {
    value: 'gaming_content',
    label: 'Creadores de contenido y edicion de video',
    description: 'Para grabacion, edicion, renderizado, arquitectura, etc.',
    mainRecommendationId: '25',
    additionalRecommendationIds: ['1', '5'],
    explanation: 'Para quienes buscan creatividad sin límites, esta PC es perfecta. El Ryzen 7 7700 ofrece un rendimiento sobresaliente para edición de video, diseño gráfico y modelado 3D. Combinado con la RTX 4070 SUPER, tendrás acceso a capacidades de renderizado acelerado por IA y gráficos de alta calidad, indispensables para software como Adobe Premiere Pro y DaVinci Resolve. Con esta configuración, tu creatividad no tendrá barreras.'
  },
  {
    value: 'gaming_maximo',
    label: 'Maxima potencia (4K)',
    description: 'No hay tarea que no puedas realizar con la mayor potencia del mercado',
    mainRecommendationId: '27',
    additionalRecommendationIds: ['4', '26'],
    explanation: 'Cuando solo aceptas lo mejor, esta es la máquina que necesitas. El Ryzen 7 7800X3D es un procesador de última generación optimizado para gaming y productividad extrema. La RTX 4090 es simplemente insuperable, ofreciendo rendimiento líder para juegos en 4K con trazado de rayos y capacidades incomparables para aplicaciones creativas. Ya sea que juegues en calidad ultra o edites videos 8K, esta PC está diseñada para redefinir tus estándares.'
  },
  // Añade aquí el resto de las opciones siguiendo el mismo formato
]

export function PCFinder() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [mainRecommendation, setMainRecommendation] = useState<Product | null>(null)
  const [additionalRecommendations, setAdditionalRecommendations] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSelection = (value: string) => {
    const option = options.find(opt => opt.value === value)
    if (option) {
      setSelectedOption(option)
      setShowRecommendations(true)
      fetchRecommendations(option)
    }
  }

  const fetchRecommendations = async (option: Option) => {
    setIsLoading(true)
    try {
      const { data: mainData, error: mainError } = await supabase
        .from('products')
        .select('*')
        .eq('id', option.mainRecommendationId)
        .single()

      if (mainError) throw mainError

      const { data: additionalData, error: additionalError } = await supabase
        .from('products')
        .select('*')
        .in('id', option.additionalRecommendationIds)

      if (additionalError) throw additionalError

      setMainRecommendation(mainData)
      setAdditionalRecommendations(additionalData || [])
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetSelection = () => {
    setSelectedOption(null)
    setShowRecommendations(false)
    setMainRecommendation(null)
    setAdditionalRecommendations([])
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
          <RadioGroup onValueChange={handleSelection} className="space-y-4 ">
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 border p-4 rounded-lg cursor-pointer">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex flex-col cursor-pointer">
                  <span className="font-extrabold text-lg bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text">{option.label}</span>
                  <span className="text-sm text-gray-700">{option.description}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </motion.div>
      )
    }

    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )
    }

    if (mainRecommendation && selectedOption) {
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
                  src={mainRecommendation.images[0]?.url || '/placeholder.svg?height=300&width=300'}
                  alt={mainRecommendation.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex-1 p-6">
                <h3 className="text-xl font-bold mb-2">{mainRecommendation.name}</h3>
                <div className="mb-4">
                  <h4 className="font-bold text-lg mb-2 bg-gradient-to-r from-[#FF512F] to-[#F09819] text-transparent bg-clip-text">¿Por qué es la mejor opción para ti?</h4>
                  <p className="text-md text-gray-600">{selectedOption.explanation}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    {mainRecommendation.discounted_price ? (
                      <>
                        <p className="text-sm line-through text-gray-500">
                          {formatPrice(mainRecommendation.price)}
                        </p>
                        <p className="text-2xl lg:text-3xl font-bold text-green-600">
                          {formatPrice(mainRecommendation.discounted_price)}
                        </p>
                      </>
                    ) : (
                      <p className="text-3xl font-bold">
                        {formatPrice(mainRecommendation.price)}
                      </p>
                    )}
                  </div>
                  <Link href={`/products/${mainRecommendation.id}`} passHref>
                    <Button className='bg-gradient-to-r from-[#FF512F] to-[#F09819]'>Ver detalles</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>

          {additionalRecommendations.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mt-8 mb-4">Otras opciones que podrían interesarte</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {additionalRecommendations.map((rec) => (
                  <Card key={rec.id} className="overflow-hidden">
                    <div className="flex flex-col">
                      <div className="relative w-full h-48">
                        <Image
                          src={rec.images[0]?.url || '/placeholder.svg?height=200&width=200'}
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
            <Button onClick={resetSelection}>Volver </Button>
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