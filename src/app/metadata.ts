import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Noxus Hardware - Computadoras de alta gama a medida',
  description: 'Tienda online de computadoras de alta gama a medida, placas de video y periféricos.',
  icons: {
    icon: '/favicon.ico', // Asegúrate de que este archivo exista en la carpeta 'public'
  },
  openGraph: {
    title: 'Noxus Hardware',
    description: 'Computadoras de alta gama a medida, placas de video y periféricos.',
    images: [
      {
        url: 'https://ejemplo.com/og-image.jpg', // Reemplaza con la URL real de tu imagen
        width: 1200,
        height: 630,
        alt: 'Noxus Hardware - Imagen de portada',
      },
    ],
  },
}