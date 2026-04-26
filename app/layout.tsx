import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ScrollToTop } from '@/components/ScrollToTop'

export const metadata: Metadata = {
  title: 'Nido — Tu inventario inmobiliario',
  description: 'Publica propiedades en 3 minutos, compártelas con tus datos y cierra más ventas. Desde $299 MXN/mes sin límite de propiedades.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Nido',
  },
  openGraph: {
    title: 'Nido — Tu inventario inmobiliario',
    description: 'Publica propiedades en 3 minutos, compártelas con tus datos y cierra más ventas. Desde $299 MXN/mes sin límite de propiedades.',
    url: 'https://nido-app-three.vercel.app',
    siteName: 'Nido Inmobiliario',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Nido Inmobiliario',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nido — Tu inventario inmobiliario',
    description: 'Publica propiedades en 3 minutos, compártelas con tus datos y cierra más ventas.',
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=630&fit=crop'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0F3460',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
}
