'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PlusCircle, Eye, Share2, Edit, Check, Copy } from 'lucide-react'
import { supabase, PropertyRow } from '@/lib/supabase'
import { formatPrice } from '@/lib/data'

export default function MisPropiedadesPage() {
  const [properties, setProperties] = useState<PropertyRow[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }
      setUserId(user.id)

      const { data } = await supabase
        .from('properties')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false })

      setProperties(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  async function handleShare(propertyId: string) {
    const url = `${window.location.origin}/p/${propertyId}?asesor=${userId}`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Propiedad en Nido', url })
      } else {
        await navigator.clipboard.writeText(url)
        setCopiedId(propertyId)
        setTimeout(() => setCopiedId(null), 2500)
      }
    } catch {
      await navigator.clipboard.writeText(url)
      setCopiedId(propertyId)
      setTimeout(() => setCopiedId(null), 2500)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 h-24 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Mis propiedades</h1>
          <p className="text-sm text-gray-500">{properties.length} propiedades en tu inventario</p>
        </div>
        <Link href="/app/agregar"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: '#0F3460' }}>
          <PlusCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Agregar</span>
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-gray-400 mb-4">Sin propiedades aún</p>
          <Link href="/app/agregar"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: '#0F3460' }}>
            <PlusCircle className="w-4 h-4" />
            Agregar primera propiedad
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex">
                {/* Image */}
                <div className="w-28 h-24 flex-shrink-0 relative">
                  {property.images[0] ? (
                    <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-300 text-xs">Sin foto</span>
                    </div>
                  )}
                  <div className={`absolute top-2 left-2 text-xs font-semibold px-1.5 py-0.5 rounded-full ${property.active ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                    {property.active ? 'Activa' : 'Borrador'}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-3 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">{property.title}</h3>
                      <p className="text-xs text-gray-500 truncate">{property.colonia}, {property.city}</p>
                      <p className="text-sm font-bold mt-1" style={{ color: '#0F3460' }}>
                        {formatPrice(property.price)}
                        {property.operation === 'Renta' && <span className="text-xs font-normal text-gray-400">/mes</span>}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                      <Eye className="w-3.5 h-3.5" />
                      {property.views}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-2">
                    <Link href={`/propiedades/${property.id}`}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg border border-gray-200 text-gray-600 hover:border-blue-900 hover:text-blue-900 transition-colors">
                      Ver ficha
                    </Link>
                    <button
                      onClick={() => handleShare(property.id)}
                      className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border border-gray-200 transition-colors"
                      style={copiedId === property.id ? { borderColor: '#16C79A', color: '#16C79A' } : { color: '#6B7280' }}
                    >
                      {copiedId === property.id ? (
                        <><Check className="w-3 h-3" />¡Copiado!</>
                      ) : (
                        <><Share2 className="w-3 h-3" />Compartir</>
                      )}
                    </button>
                    <Link href={`/app/agregar?edit=${property.id}`}
                      className="ml-auto text-gray-400 hover:text-blue-900 transition-colors p-1">
                      <Edit className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
