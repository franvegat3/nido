import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ background: '#F8F7F4' }}>
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6" style={{ background: '#0F346015' }}>
        <Search className="w-10 h-10" style={{ color: '#0F3460' }} />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Página no encontrada</h2>
      <p className="text-gray-500 text-sm mb-8 max-w-xs">
        La propiedad o página que buscas ya no existe o el link está incorrecto.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
          style={{ background: '#0F3460' }}
        >
          <Home className="w-4 h-4" />
          Ir al inicio
        </Link>
        <Link
          href="/propiedades"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          Ver propiedades
        </Link>
      </div>
      <p className="mt-8 text-xs text-gray-400">
        Nido Inmobiliario · El inventario siempre en tu celular
      </p>
    </div>
  )
}
