import Link from 'next/link'
import { Building2, Eye, TrendingUp, MessageCircle, PlusCircle, ChevronRight, Share2 } from 'lucide-react'
import { PROPERTIES, ADVISORS, getAdvisor, formatPrice } from '@/lib/data'
import { PropertyCard } from '@/components/PropertyCard'

const advisor = ADVISORS[0]
const myProperties = PROPERTIES.filter((p) => p.ownerId === advisor.id)
const totalViews = myProperties.reduce((acc, p) => acc + p.views, 0)

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Welcome */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Hola, {advisor.name.split(' ')[0]} 👋</h1>
        <p className="text-gray-500 text-sm">Aquí está el resumen de tu actividad</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Propiedades', value: myProperties.length, icon: Building2, color: '#0F3460' },
          { label: 'Vistas totales', value: totalViews, icon: Eye, color: '#E8A020' },
          { label: 'Leads del mes', value: 12, icon: MessageCircle, color: '#16C79A' },
          { label: 'Compartidas', value: 34, icon: Share2, color: '#8B5CF6' },
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
        <Link
          href="/app/agregar"
          className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#0F3460' }}>
            <PlusCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">Agregar propiedad</div>
            <div className="text-xs text-gray-400">En menos de 3 min</div>
          </div>
        </Link>
        <Link
          href="/propiedades"
          className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#E8A02015' }}>
            <TrendingUp className="w-5 h-5" style={{ color: '#E8A020' }} />
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">Ver bolsa</div>
            <div className="text-xs text-gray-400">+12,400 propiedades</div>
          </div>
        </Link>
      </div>

      {/* My properties */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Mis propiedades</h2>
          <Link href="/app/mis-propiedades" className="flex items-center gap-1 text-sm" style={{ color: '#0F3460' }}>
            Ver todas <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {myProperties.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <Building2 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm mb-4">Aún no tienes propiedades publicadas</p>
            <Link href="/app/agregar" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: '#0F3460' }}>
              <PlusCircle className="w-4 h-4" />
              Agregar primera propiedad
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myProperties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} compact />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
