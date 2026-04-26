import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nido — Tu inventario inmobiliario',
  description: 'La forma más fácil y barata para que un asesor inmobiliario publique propiedades, las comparta con clientes y colegas, y venda más — todo desde su celular.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Nido',
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
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  )
}
