import Link from 'next/link'
import { Home, Building2, PlusCircle, Users, BarChart3, Settings, Clock } from 'lucide-react'
import { ADVISORS } from '@/lib/data'
import { daysUntil } from '@/lib/utils'

const advisor = ADVISORS[0] // Simulated logged-in user

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const daysLeft = daysUntil(advisor.trialEnds)
  const isOnTrial = advisor.plan === 'trial'

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ background: '#F8F7F4' }}>
      {/* Sidebar — desktop only */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0">
        {/* Logo */}
        <div className="p-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#0F3460' }}>
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg" style={{ color: '#0F3460' }}>Nido</span>
          </Link>
        </div>

        {/* Advisor */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img src={advisor.photo} alt={advisor.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="min-w-0">
              <div className="font-semibold text-sm text-gray-900 truncate">{advisor.name}</div>
              <div className="text-xs text-gray-500 truncate">{advisor.agency}</div>
            </div>
          </div>

          {isOnTrial && (
            <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl p-2.5">
              <div className="flex items-center gap-1.5 text-amber-700 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5" />
                {daysLeft} días de prueba restantes
              </div>
              <Link href="#" className="mt-1.5 block text-center text-xs font-semibold text-white py-1.5 rounded-lg" style={{ background: '#E8A020' }}>
                Suscribirme ahora
              </Link>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {[
            { href: '/app', label: 'Dashboard', icon: BarChart3 },
            { href: '/app/mis-propiedades', label: 'Mis propiedades', icon: Building2 },
            { href: '/app/agregar', label: 'Agregar propiedad', icon: PlusCircle },
            { href: '/app/contactos', label: 'Contactos', icon: Users },
          ].map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-900 transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <Link href="/app/configuracion" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
            <Settings className="w-4 h-4" />
            Configuración
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="md:hidden bg-white border-b border-gray-200 px-4 h-14 flex items-center gap-3">
          <img src={advisor.photo} alt={advisor.name} className="w-8 h-8 rounded-full object-cover" />
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900">{advisor.name}</div>
          </div>
          {isOnTrial && (
            <Link href="#" className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white" style={{ background: '#E8A020' }}>
              {daysLeft}d restantes
            </Link>
          )}
        </header>

        <div className="flex-1 p-4 md:p-6">{children}</div>

        {/* Mobile bottom nav spacer */}
        <div className="h-16 md:hidden" />
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around h-16">
          {[
            { href: '/app', label: 'Dashboard', icon: BarChart3 },
            { href: '/app/mis-propiedades', label: 'Propiedades', icon: Building2 },
            { href: '/app/agregar', label: 'Agregar', icon: PlusCircle },
            { href: '/app/contactos', label: 'Contactos', icon: Users },
          ].map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex flex-col items-center gap-0.5 flex-1 py-2 text-gray-500">
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
