'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, X, Plus, Check, ChevronLeft, MapPin, DollarSign, Home, Info } from 'lucide-react'
import Link from 'next/link'

type FormData = {
  type: string
  operation: string
  title: string
  price: string
  area: string
  bedrooms: string
  bathrooms: string
  parking: string
  address: string
  colonia: string
  city: string
  state: string
  description: string
  amenities: string[]
}

const PROPERTY_TYPES = ['Casa', 'Departamento', 'Terreno', 'Local Comercial', 'Oficina']
const OPERATIONS = ['Venta', 'Renta']
const COMMON_AMENITIES = ['Jardín', 'Alberca', 'Gimnasio', 'Seguridad 24/7', 'Vigilancia', 'Estacionamiento extra', 'Cuarto de servicio', 'Roof garden', 'Pet friendly', 'Amueblado', 'Cocina equipada', 'Aire acondicionado']

const STEPS = ['Tipo y precio', 'Detalles', 'Ubicación', 'Fotos', 'Descripción']

export default function AgregarPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
  ])
  const [newAmenity, setNewAmenity] = useState('')
  const [form, setForm] = useState<FormData>({
    type: 'Casa',
    operation: 'Venta',
    title: '',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    address: '',
    colonia: '',
    city: '',
    state: 'Jalisco',
    description: '',
    amenities: [],
  })

  function update(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function toggleAmenity(amenity: string) {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(amenity)
        ? f.amenities.filter((a) => a !== amenity)
        : [...f.amenities, amenity],
    }))
  }

  async function handlePublish() {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSaving(false)
    setSaved(true)
    setTimeout(() => router.push('/app/mis-propiedades'), 1500)
  }

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: '#16C79A15' }}>
          <Check className="w-8 h-8" style={{ color: '#16C79A' }} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">¡Propiedad publicada!</h2>
        <p className="text-gray-500 text-sm">Tu ficha ya está disponible y lista para compartir</p>
        <div className="w-6 h-6 border-2 border-blue-900 border-t-transparent rounded-full animate-spin mt-6" />
      </div>
    )
  }

  return (
    <div className="max-w-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        {step > 0 ? (
          <button onClick={() => setStep((s) => s - 1)} className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
        ) : (
          <Link href="/app" className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        )}
        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-900">Agregar propiedad</h1>
          <p className="text-xs text-gray-400">Paso {step + 1} de {STEPS.length} — {STEPS[step]}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full transition-all ${i <= step ? 'opacity-100' : 'opacity-20'}`}
            style={{ background: '#0F3460' }}
          />
        ))}
      </div>

      {/* Step 0: Tipo y precio */}
      {step === 0 && (
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Tipo de propiedad</label>
            <div className="grid grid-cols-3 gap-2">
              {PROPERTY_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => update('type', t)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-medium border-2 transition-all ${form.type === t ? 'text-white border-blue-900' : 'border-gray-200 text-gray-600 bg-white hover:border-blue-900'}`}
                  style={form.type === t ? { background: '#0F3460', borderColor: '#0F3460' } : {}}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Operación</label>
            <div className="grid grid-cols-2 gap-2">
              {OPERATIONS.map((op) => (
                <button
                  key={op}
                  onClick={() => update('operation', op)}
                  className={`py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${form.operation === op ? 'text-white' : 'border-gray-200 text-gray-600 bg-white'}`}
                  style={form.operation === op ? { background: op === 'Venta' ? '#0F3460' : '#E8A020', borderColor: op === 'Venta' ? '#0F3460' : '#E8A020' } : {}}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Precio {form.operation === 'Renta' ? '(mensual)' : ''}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                placeholder={form.operation === 'Renta' ? '18,000' : '3,500,000'}
                value={form.price}
                onChange={(e) => update('price', e.target.value)}
                className="w-full pl-7 pr-16 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-900 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">MXN</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Detalles */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Nombre / título</label>
            <input
              type="text"
              placeholder="ej: Casa moderna en Providencia con jardín"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-900 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Superficie (m²)', field: 'area' as const, placeholder: '120' },
              { label: 'Recámaras', field: 'bedrooms' as const, placeholder: '3' },
              { label: 'Baños', field: 'bathrooms' as const, placeholder: '2' },
              { label: 'Estacionamientos', field: 'parking' as const, placeholder: '1' },
            ].map(({ label, field, placeholder }) => (
              <div key={field}>
                <label className="text-xs font-medium text-gray-600 mb-1 block">{label}</label>
                <input
                  type="number"
                  placeholder={placeholder}
                  value={form[field]}
                  onChange={(e) => update(field, e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-900 transition-colors"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Características</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {COMMON_AMENITIES.map((a) => (
                <button
                  key={a}
                  onClick={() => toggleAmenity(a)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${form.amenities.includes(a) ? 'text-white border-blue-900' : 'border-gray-200 text-gray-600 bg-white'}`}
                  style={form.amenities.includes(a) ? { background: '#0F3460', borderColor: '#0F3460' } : {}}
                >
                  {a}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Otra característica..."
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && newAmenity.trim()) { toggleAmenity(newAmenity.trim()); setNewAmenity('') } }}
                className="flex-1 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm outline-none"
              />
              <button
                onClick={() => { if (newAmenity.trim()) { toggleAmenity(newAmenity.trim()); setNewAmenity('') } }}
                className="px-3 py-2 rounded-xl text-white text-sm"
                style={{ background: '#0F3460' }}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Ubicación */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-2 text-xs text-blue-700">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            La dirección exacta solo la verán los clientes que contacten al asesor.
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Dirección</label>
            <input type="text" placeholder="Av. Providencia 1234" value={form.address} onChange={(e) => update('address', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-900 transition-colors" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Colonia / Fraccionamiento</label>
              <input type="text" placeholder="Providencia" value={form.colonia} onChange={(e) => update('colonia', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-900 transition-colors" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Ciudad</label>
              <input type="text" placeholder="Guadalajara" value={form.city} onChange={(e) => update('city', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-900 transition-colors" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Estado</label>
            <select value={form.state} onChange={(e) => update('state', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-900 transition-colors">
              {['Jalisco', 'Nuevo León', 'CDMX', 'Estado de México', 'Querétaro', 'Aguascalientes', 'Guanajuato', 'Otros'].map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Step 3: Fotos */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Camera className="w-4 h-4" />
            Agrega fotos desde tu cámara o galería
          </div>

          <div className="grid grid-cols-3 gap-2">
            {photos.map((photo, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200">
                <img src={photo} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => setPhotos((p) => p.filter((_, idx) => idx !== i))}
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 text-xs bg-black/60 text-white rounded px-1">Principal</span>
                )}
              </div>
            ))}

            {/* Add photo button */}
            <button
              onClick={() => {
                const mockPhotos = [
                  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80',
                  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&q=80',
                  'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&q=80',
                ]
                setPhotos((p) => [...p, mockPhotos[p.length % mockPhotos.length]])
              }}
              className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-blue-900 hover:text-blue-900 transition-colors"
            >
              <Camera className="w-5 h-5" />
              <span className="text-xs">Agregar</span>
            </button>
          </div>

          <p className="text-xs text-gray-400">
            La primera foto será la foto principal. Arrastra para reordenar. (En producción: accede a la cámara directamente)
          </p>
        </div>
      )}

      {/* Step 4: Descripción */}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Descripción</label>
            <textarea
              rows={6}
              placeholder="Describe la propiedad: ubicación, acabados, entorno, puntos de interés cercanos, condiciones de la negociación..."
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-900 transition-colors resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">{form.description.length} caracteres</p>
          </div>

          {/* Preview card */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-xs font-medium text-gray-600 mb-2">Vista previa</p>
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
              {photos[0] && <img src={photos[0]} alt="" className="w-full h-28 object-cover" />}
              <div className="p-3">
                <p className="font-semibold text-sm text-gray-900">{form.title || 'Título de la propiedad'}</p>
                <p className="text-xs text-gray-500 mt-0.5">{form.colonia || 'Colonia'}, {form.city || 'Ciudad'}</p>
                <p className="text-base font-bold mt-1" style={{ color: '#0F3460' }}>
                  ${form.price ? parseInt(form.price).toLocaleString() : '0'} MXN
                  {form.operation === 'Renta' && <span className="text-xs font-normal text-gray-400">/mes</span>}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex gap-3">
        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="flex-1 py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
            style={{ background: '#0F3460' }}
          >
            Continuar
          </button>
        ) : (
          <button
            onClick={handlePublish}
            disabled={saving}
            className="flex-1 py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
            style={{ background: '#16C79A' }}
          >
            {saving ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Check className="w-4 h-4" />
                Publicar propiedad
              </>
            )}
          </button>
        )}
        <button
          onClick={() => router.push('/app')}
          className="px-4 py-3 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 bg-white"
        >
          Guardar borrador
        </button>
      </div>
    </div>
  )
}
