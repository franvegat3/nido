'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Grid, List, X, SlidersHorizontal } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { PropertyCard } from '@/components/PropertyCard'
import { PROPERTIES, ADVISORS, searchProperties, getAdvisor } from '@/lib/data'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const CITIES = ['Todas', 'Guadalajara', 'Monterrey', 'Ciudad de México', 'Zapopan', 'San Pedro Garza García']
const TYPES = ['Todos', 'Casa', 'Departamento', 'Terreno', 'Local Comercial', 'Oficina']
const OPERATIONS = ['Todos', 'Venta', 'Renta']

function PropiedadesContent() {
  const searchParams = useSearchParams()
  const initialQ = searchParams.get('q') ?? ''
  const initialCity = searchParams.get('ciudad') ?? ''

  const [keyword, setKeyword] = useState(initialQ)
  const [city, setCity] = useState(initialCity)
  const [type, setType] = useState('')
  const [operation, setOperation] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const results = useMemo(() => {
    return searchProperties({
      keyword: keyword || undefined,
      city: city || undefined,
      type: type || undefined,
      operation: operation || undefined,
    })
  }, [keyword, city, type, operation])

  const activeFilters = [
    city && city !== 'Todas' && city,
    type && type !== 'Todos' && type,
    operation && operation !== 'Todos' && operation,
  ].filter(Boolean)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Search header */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 space-y-3">
          {/* Search input */}
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Busca por ciudad, colonia, tipo..."
                className="flex-1 bg-transparent text-sm outline-none text-gray-900 placeholder:text-gray-400"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              {keyword && (
                <button onClick={() => setKeyword('')}>
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium border transition-colors ${showFilters ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-gray-700 border-gray-200'}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
              {activeFilters.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>
            <div className="hidden md:flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setView('grid')} className={`p-2.5 ${view === 'grid' ? 'bg-blue-900 text-white' : 'bg-white text-gray-500'}`}>
                <Grid className="w-4 h-4" />
              </button>
              <button onClick={() => setView('list')} className={`p-2.5 ${view === 'list' ? 'bg-blue-900 text-white' : 'bg-white text-gray-500'}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick filter chips */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {OPERATIONS.map((op) => (
              <button
                key={op}
                onClick={() => setOperation(op === 'Todos' ? '' : op)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${(op === 'Todos' && !operation) || operation === op ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-gray-600 border-gray-200'}`}
              >
                {op}
              </button>
            ))}
            <div className="w-px h-6 bg-gray-200 self-center flex-shrink-0" />
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t === 'Todos' ? '' : t)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${(t === 'Todos' && !type) || type === t ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-gray-600 border-gray-200'}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Extended filters */}
          {showFilters && (
            <div className="bg-gray-50 rounded-xl p-3 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Ciudad</label>
                <select
                  className="w-full text-sm bg-white border border-gray-200 rounded-lg px-2 py-1.5 outline-none"
                  value={city}
                  onChange={(e) => setCity(e.target.value === 'Todas' ? '' : e.target.value)}
                >
                  {CITIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Tipo</label>
                <select
                  className="w-full text-sm bg-white border border-gray-200 rounded-lg px-2 py-1.5 outline-none"
                  value={type || 'Todos'}
                  onChange={(e) => setType(e.target.value === 'Todos' ? '' : e.target.value)}
                >
                  {TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Operación</label>
                <select
                  className="w-full text-sm bg-white border border-gray-200 rounded-lg px-2 py-1.5 outline-none"
                  value={operation || 'Todos'}
                  onChange={(e) => setOperation(e.target.value === 'Todos' ? '' : e.target.value)}
                >
                  {OPERATIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => { setKeyword(''); setCity(''); setType(''); setOperation(''); }}
                  className="w-full py-1.5 rounded-lg text-sm text-gray-600 border border-gray-200 bg-white"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{results.length}</span> propiedades encontradas
          </p>
          {activeFilters.length > 0 && (
            <div className="flex gap-1.5">
              {(activeFilters as string[]).map((f) => (
                <span key={f} className="text-xs bg-blue-50 text-blue-900 border border-blue-100 rounded-full px-2 py-0.5">
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>

        {results.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-700 mb-1">No encontramos propiedades</h3>
            <p className="text-gray-400 text-sm">Prueba con otros filtros o palabras clave</p>
            <button
              onClick={() => { setKeyword(''); setCity(''); setType(''); setOperation(''); }}
              className="mt-4 px-4 py-2 rounded-xl text-sm font-medium text-white"
              style={{ background: '#0F3460' }}
            >
              Ver todas las propiedades
            </button>
          </div>
        ) : (
          <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
            {results.map((property) => (
              <PropertyCard key={property.id} property={property} advisor={getAdvisor(property.ownerId)} compact={view === 'list'} />
            ))}
          </div>
        )}
      </main>

      {/* Mobile spacer */}
      <div className="h-16 md:hidden" />
    </div>
  )
}

export default function PropiedadesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin w-8 h-8 border-2 border-blue-900 border-t-transparent rounded-full" /></div>}>
      <PropiedadesContent />
    </Suspense>
  )
}
