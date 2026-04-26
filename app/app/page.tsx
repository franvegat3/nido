'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Building2, Eye, MessageCircle, PlusCircle, ChevronRight, Share2, TrendingUp } from 'lucide-react'
import { supabase, PropertyRow, Profile } from '@/lib/supabase'
import { formatPrice } from '@/lib/data'

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [properties, setProperties] = useState<PropertyRow[]>([])
  const [leadCount, setLeadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [profileRes, propertiesRes, leadsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('properties').select('*').eq('owner_id', user.id).order('created_at', { ascending: false }),
        supabase.from('leads').select('id', { count: 'exact', head: true }).eq('advisor_id', user.id),
      ])

      if (profileRes.data) setProfile(profileRes.data)
      if (propertiesRes.data) setProperties(propertiesRes.data)
      setLeadCount(leadsRes.count ?? 0)
      setLoading(false)
    }
    load()
  }, [])

  const firstName = profile?.name?.split(' ')[0] ?? 'Asesor'
  const totalViews = properties.reduce((acc, p) => acc + p.views, 0)

  if (loading) {
    return (
      <div className="space-y-4 max-w-4xl">
        <div className="h-7 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-24 bg-white rounded-2xl animate-pulse" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Welcome */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Hola, {firstName}</h1>
        <p className="text-gray-500 text-sm">Aquí está el resumen de tu actividad</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Propiedades', value: properties.length, icon: Building2, color: '#0F3460' },
          { label: 'Vistas totales', value: totalViews, icon: Eye, color: '#E8A020' },
          { label: 'Leads totales', value: leadCount, icon: MessageCircle, color: '#16C79A' },
          { label: 'Activas', value: properties.filter((p) => p.active).length, icon: Share2, color: '#8B5CF6' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}15` }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/app/agregar"
          className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#0F3460' }}>
            <PlusCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">Agregar propiedad</div>
            <div className="text-xs text-gray-400">En menos de 3 min</div>
          </div>
        </Link>
        <Link href="/propiedades"
          className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#E8A02015' }}>
            <TrendingUp className="w-5 h-5" style={{ color: '#E8A020' }} />
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">Ver bolsa</div>
            <div className="text-xs text-gray-400">Propiedades públicas</div>
          </div>
        </Link>
      </div>

      {/* My properties */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Mis propiedades recientes</h2>
          <Link href="/app/mis-propiedades" className="flex items-center gap-1 text-sm" style={{ color: '#0F3460' }}>
            Ver todas <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <Building2 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm mb-4">Aún no tienes propiedades publicadas</p>
            <Link href="/app/agregar"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: '#0F3460' }}>
              <PlusCircle className="w-4 h-4" />
              Agregar primera propiedad
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {properties.slice(0, 3).map((property) => (
              <div key={property.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm flex gap-3 p-3 items-center">
                {property.images[0] ? (
                  <img src={property.images[0]} alt={property.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900 truncate">{property.title}</p>
                  <p className="text-xs text-gray-500 truncate">{property.colonia}, {property.city}</p>
                  <p className="text-sm font-bold mt-0.5" style={{ color: '#0F3460' }}>{formatPrice(property.price)}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                  <Eye className="w-3.5 h-3.5" />
                  {property.views}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
