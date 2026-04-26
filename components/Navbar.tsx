'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, PlusSquare, User, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Inicio', icon: Home },
    { href: '/propiedades', label: 'Buscar', icon: Search },
    { href: '/app/agregar', label: 'Publicar', icon: PlusSquare },
    { href: '/app', label: 'Mi cuenta', icon: LayoutDashboard },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#0F3460' }}>
            <Home className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg" style={{ color: '#0F3460' }}>Nido</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/propiedades" className={cn('text-sm font-medium transition-colors hover:text-blue-900', pathname.startsWith('/propiedades') ? 'text-blue-900' : 'text-gray-600')}>
            Buscar propiedades
          </Link>
          <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-blue-900">
            Iniciar sesión
          </Link>
          <Link href="/auth/registro" className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: '#0F3460' }}>
            Prueba gratis 30 días
          </Link>
        </nav>

        {/* Mobile right button */}
        <div className="md:hidden">
          <Link href="/auth/registro" className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: '#0F3460' }}>
            Prueba gratis
          </Link>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around h-16">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <Link key={href} href={href} className={cn('flex flex-col items-center gap-0.5 flex-1 py-2 transition-colors', active ? 'text-blue-900' : 'text-gray-500')}>
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
