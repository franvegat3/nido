import { notFound } from 'next/navigation'
import { MapPin, Bed, Bath, Car, Maximize2, Eye, CheckCircle2, Info } from 'lucide-react'
import { getProperty, getAdvisor, ADVISORS, formatPrice } from '@/lib/data'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { GalleryViewer } from '@/components/GalleryViewer'

export async function generateStaticParams() {
  const { PROPERTIES } = await import('@/lib/data')
  return PROPERTIES.map((p) => ({ id: p.id }))
}

export default async function SharedPropertyPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ asesor?: string }>
}) {
  const { id } = await params
  const { asesor: advisorId } = await searchParams

  const property = getProperty(id)
  if (!property) notFound()

  // Rebranding: use the advisor who shared, fallback to original owner
  const sharedAdvisor = advisorId ? getAdvisor(advisorId) : null
  const displayAdvisor = sharedAdvisor ?? getAdvisor(property.ownerId)!
  const isRebranded = sharedAdvisor && sharedAdvisor.id !== property.ownerId

  const whatsappMsg = `Hola ${displayAdvisor.name}, vi la propiedad "${property.title}" y me gustaría obtener más información.`

  return (
    <div className="min-h-screen" style={{ background: '#F8F7F4' }}>
      {/* Branded header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <img
            src={displayAdvisor.photo}
            alt={displayAdvisor.name}
            className="w-9 h-9 rounded-full object-cover border-2 border-gray-100"
          />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 text-sm truncate">{displayAdvisor.name}</div>
            <div className="text-xs text-gray-500 truncate">{displayAdvisor.agency} · {displayAdvisor.license}</div>
          </div>
          <a
            href={`tel:${displayAdvisor.phone}`}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Llamar
          </a>
        </div>
      </header>

      {/* Rebranding notice for advisors */}
      {isRebranded && (
        <div className="max-w-2xl mx-auto px-4 pt-3">
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>Esta ficha fue compartida por <strong>{sharedAdvisor!.name}</strong>. El cliente verá sus datos de contacto automáticamente.</span>
          </div>
        </div>
      )}

      <main className="max-w-2xl mx-auto px-4 py-4 pb-32">
        {/* Gallery */}
        <GalleryViewer images={property.images} title={property.title} />

        {/* Header info */}
        <div className="mt-5">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${property.operation === 'Venta' ? 'bg-blue-900 text-white' : 'bg-amber-500 text-white'}`}>
              {property.operation === 'Venta' ? 'En Venta' : 'En Renta'}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
              {property.type}
            </span>
            <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
              <Eye className="w-3.5 h-3.5" />
              {property.views}
            </span>
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h1>

          <p className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
            <MapPin className="w-4 h-4" />
            {property.colonia}, {property.city}, {property.state}
          </p>

          <div className="text-3xl font-bold mb-1" style={{ color: '#0F3460' }}>
            {formatPrice(property.price)}
            {property.operation === 'Renta' && <span className="text-base font-normal text-gray-500 ml-1">/mes</span>}
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          {property.area && (
            <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
              <Maximize2 className="w-5 h-5 mx-auto mb-1 text-gray-400" />
              <div className="font-semibold text-gray-900 text-sm">{property.area}m²</div>
              <div className="text-xs text-gray-400">Superficie</div>
            </div>
          )}
          {property.bedrooms !== null && (
            <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
              <Bed className="w-5 h-5 mx-auto mb-1 text-gray-400" />
              <div className="font-semibold text-gray-900 text-sm">{property.bedrooms}</div>
              <div className="text-xs text-gray-400">Recámaras</div>
            </div>
          )}
          {property.bathrooms !== null && (
            <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
              <Bath className="w-5 h-5 mx-auto mb-1 text-gray-400" />
              <div className="font-semibold text-gray-900 text-sm">{property.bathrooms}</div>
              <div className="text-xs text-gray-400">Baños</div>
            </div>
          )}
          {property.parking !== null && (
            <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
              <Car className="w-5 h-5 mx-auto mb-1 text-gray-400" />
              <div className="font-semibold text-gray-900 text-sm">{property.parking}</div>
              <div className="text-xs text-gray-400">Est.</div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mt-5 bg-white rounded-2xl p-5 border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-3">Descripción</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
        </div>

        {/* Amenities */}
        {property.amenities.length > 0 && (
          <div className="mt-4 bg-white rounded-2xl p-5 border border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-3">Características</h2>
            <div className="grid grid-cols-2 gap-2">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#16C79A' }} />
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Advisor card */}
        <div className="mt-4 bg-white rounded-2xl p-5 border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-4">Tu asesor de confianza</h2>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={displayAdvisor.photo}
              alt={displayAdvisor.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
            />
            <div>
              <div className="font-bold text-gray-900">{displayAdvisor.name}</div>
              <div className="text-sm text-gray-500">{displayAdvisor.agency}</div>
              <div className="text-xs text-gray-400">{displayAdvisor.license}</div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">{displayAdvisor.bio}</p>
          <div className="space-y-2">
            <WhatsAppButton phone={displayAdvisor.phone} message={whatsappMsg} />
            <a
              href={`tel:${displayAdvisor.phone}`}
              className="w-full py-2.5 rounded-xl border-2 text-sm font-semibold text-center block"
              style={{ borderColor: '#0F3460', color: '#0F3460' }}
            >
              Llamar al asesor
            </a>
          </div>
        </div>

        {/* Nido branding */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">Propiedad publicada en</p>
          <p className="text-sm font-bold mt-1" style={{ color: '#0F3460' }}>Nido Inmobiliario</p>
          <p className="text-xs text-gray-400 mt-1">ID: {property.id.toUpperCase()}</p>
        </div>
      </main>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <WhatsAppButton phone={displayAdvisor.phone} message={whatsappMsg} />
      </div>
    </div>
  )
}
