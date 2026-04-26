'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Car, Maximize2, Heart, Eye } from 'lucide-react'
import { Property, Advisor, formatPrice } from '@/lib/data'
import { cn } from '@/lib/utils'

type Props = {
  property: Property
  advisor?: Advisor
  compact?: boolean
  href?: string
}

export function PropertyCard({ property, advisor, compact = false, href }: Props) {
  const link = href ?? `/propiedades/${property.id}`
  const badge = property.operation === 'Venta' ? 'En Venta' : 'En Renta'
  const badgeColor = property.operation === 'Venta' ? 'bg-blue-900 text-white' : 'bg-amber-500 text-white'

  return (
    <Link href={link} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: compact ? 160 : 200 }}>
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className={cn('text-xs font-semibold px-2 py-1 rounded-full', badgeColor)}>
            {badge}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/90 text-gray-700">
            {property.type}
          </span>
        </div>
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow hover:bg-white transition-colors"
          aria-label="Guardar"
        >
          <Heart className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-1">
          <span className="text-xl font-bold" style={{ color: '#0F3460' }}>
            {formatPrice(property.price)}
          </span>
          {property.operation === 'Renta' && (
            <span className="text-sm text-gray-500 ml-1">/mes</span>
          )}
        </div>

        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">{property.title}</h3>

        <p className="text-xs text-gray-500 mb-3">
          {property.colonia} · {property.city}, {property.state}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-3 text-xs text-gray-600 border-t border-gray-100 pt-3">
          {property.bedrooms !== null && (
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" />
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms !== null && (
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              {property.bathrooms}
            </span>
          )}
          {property.parking !== null && (
            <span className="flex items-center gap-1">
              <Car className="w-3.5 h-3.5" />
              {property.parking}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5" />
            {property.area}m²
          </span>
          <span className="ml-auto flex items-center gap-1 text-gray-400">
            <Eye className="w-3.5 h-3.5" />
            {property.views}
          </span>
        </div>

        {/* Advisor */}
        {advisor && !compact && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
            <img src={advisor.photo} alt={advisor.name} className="w-6 h-6 rounded-full object-cover" />
            <span className="text-xs text-gray-600">{advisor.name}</span>
            <span className="text-xs text-gray-400 ml-auto">{advisor.agency}</span>
          </div>
        )}
      </div>
    </Link>
  )
}
