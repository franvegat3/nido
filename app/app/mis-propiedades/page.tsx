import Link from 'next/link'
import { PlusCircle, Eye, Share2, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { PROPERTIES, ADVISORS, formatPrice } from '@/lib/data'

const advisor = ADVISORS[0]
const myProperties = PROPERTIES.filter((p) => p.ownerId === advisor.id)

export default function MisPropiedadesPage() {
  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Mis propiedades</h1>
          <p className="text-sm text-gray-500">{myProperties.length} propiedades en tu inventario</p>
        </div>
        <Link
          href="/app/agregar"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: '#0F3460' }}
        >
          <PlusCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Agregar</span>
        </Link>
      </div>

      {myProperties.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-gray-400 mb-4">Sin propiedades aún</p>
          <Link href="/app/agregar" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: '#0F3460' }}>
            <PlusCircle className="w-4 h-4" />
            Agregar primera propiedad
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {myProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex gap-0">
                {/* Image */}
                <div className="w-28 h-24 flex-shrink-0 relative">
                  <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                  <div className={`absolute top-2 left-2 text-xs font-semibold px-1.5 py-0.5 rounded-full ${property.published ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                    {property.published ? 'Activa' : 'Borrador'}
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
                    <Link
                      href={`/propiedades/${property.id}`}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg border border-gray-200 text-gray-600 hover:border-blue-900 hover:text-blue-900 transition-colors"
                    >
                      Ver ficha
                    </Link>
                    <button className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors">
                      <Share2 className="w-3 h-3" />
                      Compartir
                    </button>
                    <Link
                      href={`/app/agregar?edit=${property.id}`}
                      className="ml-auto text-gray-400 hover:text-blue-900 transition-colors p-1"
                    >
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
