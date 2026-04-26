'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Building2, PlusCircle, Users, BarChart3, Settings, Clock, LogOut } from 'lucide-react'
import { supabase, Profile } from '@/lib/supabase'
import { daysUntil } from '@/lib/utils'

const NAV = [
  { href: '/app', label: 'Dashboard', icon: BarChart3 },
  { href: '/app/mis-propiedades', label: 'Mis propiedades', icon: Building2 },
  { href: '/app/agregar', label: 'Agregar propiedad', icon: PlusCircle },
  { href: '/app/contactos', label: 'Contactos', icon: Users },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace('/auth/login')
        return
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileData) {
        setProfile(profileData)
      } else {
        // Fallback: build profile from auth metadata
        setProfile({
          id: user.id,
          email: user.email ?? '',
          name: user.user_metadata?.name ?? user.email?.split('@')[0] ?? 'Asesor',
          phone: user.user_metadata?.phone ?? '',
          agency: user.user_metadata?.agency ?? null,
          photo: null,
          plan: 'trial',
          trial_ends: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: user.created_at,
        })
      }
      setLoading(false)
    }
    loadUser()
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8F7F4' }}>
        <div className="w-8 h-8 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!profile) return null

  const daysLeft = daysUntil(profile.trial_ends)
  const isOnTrial = profile.plan === 'trial'
  const initials = profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

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
            {profile.photo ? (
              <img src={profile.photo} alt={profile.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: '#0F3460' }}>
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <div className="font-semibold text-sm text-gray-900 truncate">{profile.name}</div>
              <div className="text-xs text-gray-500 truncate">{profile.agency ?? profile.email}</div>
            </div>
          </div>

          {isOnTrial && daysLeft > 0 && (
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
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? 'text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-900'}`}
                style={active ? { background: '#0F3460' } : {}}>
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-gray-100 space-y-1">
          <Link href="/app/configuracion" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
            <Settings className="w-4 h-4" />
            Configuración
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="md:hidden bg-white border-b border-gray-200 px-4 h-14 flex items-center gap-3">
          {profile.photo ? (
            <img src={profile.photo} alt={profile.name} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: '#0F3460' }}>
              {initials}
            </div>
          )}
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900">{profile.name}</div>
          </div>
          {isOnTrial && daysLeft > 0 && (
            <Link href="#" className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white whitespace-nowrap" style={{ background: '#E8A020' }}>
              {daysLeft} días gratis
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
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                className="flex flex-col items-center gap-0.5 flex-1 py-2 transition-colors"
                style={{ color: active ? '#0F3460' : '#9CA3AF' }}>
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{label === 'Mis propiedades' ? 'Propiedades' : label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
