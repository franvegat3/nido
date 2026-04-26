import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Bed, Bath, Car, Maximize2, Share2, ChevronLeft, Eye, CheckCircle2 } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { getProperty, getAdvisor, formatPrice } from '@/lib/data'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { ShareButton } from '@/components/ShareButton'
import { GalleryViewer } from '@/components/GalleryViewer'

export async function generateStaticParams() {
  const { PROPERTIES } = await import('@/lib/data')
  return PROPERTIES.map((p) => ({ id: p.id }))
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = getProperty(id)
  if (!property) notFound()

  const advisor = getAdvisor(property.ownerId)!

  const whatsappMsg = `Hola, vi la propiedad "${property.title}" en Nido y me gustaría obtener más información.`

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Back button */}
      <div className="max-w-4xl mx-auto w-full px-4 py-3">
        <Link href="/propiedades" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
          <ChevronLeft className="w-4 h-4" />
          Volver a resultados
        </Link>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pb-24 md:pb-8">
        {/* Gallery */}
        <GalleryViewer images={property.images} title={property.title} />

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${property.operation === 'Venta' ? 'bg-blue-900 text-white' : 'bg-amber-500 text-white'}`}>
                  {property.operation === 'Venta' ? 'En Venta' : 'En Renta'}
                </span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                  {property.type}
                </span>
                <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
                  <Eye className="w-3.5 h-3.5" />
                  {property.views} vistas
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-1">{property.title}</h1>

              <p className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                {property.address}, {property.colonia}, {property.city}, {property.state}
              </p>

              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold" style={{ color: '#0F3460' }}>
                  {formatPrice(property.price)}
                </span>
                {property.operation === 'Renta' && (
                  <span className="text-gray-500 mb-1">/mes</span>
                )}
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {property.area && (
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <Maximize2 className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                  <div className="font-semibold text-gray-900 text-sm">{property.area}m²</div>
                  <div className="text-xs text-gray-400">Superficie</div>
                </div>
              )}
              {property.bedrooms !== null && (
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <Bed className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                  <div className="font-semibold text-gray-900 text-sm">{property.bedrooms}</div>
                  <div className="text-xs text-gray-400">Recámaras</div>
                </div>
              )}
              {property.bathrooms !== null && (
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <Bath className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                  <div className="font-semibold text-gray-900 text-sm">{property.bathrooms}</div>
                  <div className="text-xs text-gray-400">Baños</div>
                </div>
              )}
              {property.parking !== null && (
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <Car className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                  <div className="font-semibold text-gray-900 text-sm">{property.parking}</div>
                  <div className="text-xs text-gray-400">Estacionamiento</div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">Descripción</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-3">Características</h2>
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

            {/* Map placeholder */}
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">Ubicación</h2>
              <div className="rounded-xl overflow-hidden bg-gray-100 h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">{property.colonia}, {property.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Advisor card */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-20">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Contactar asesor</h3>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={advisor.photo}
                  alt={advisor.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
                />
                <div>
                  <div className="font-semibold text-gray-900">{advisor.name}</div>
                  <div className="text-xs text-gray-500">{advisor.agency}</div>
                  <div className="text-xs text-gray-400">{advisor.license}</div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-4 leading-relaxed">{advisor.bio}</p>

              <div className="space-y-2">
                <WhatsAppButton phone={advisor.phone} message={whatsappMsg} />
                <a
                  href={`tel:${advisor.phone}`}
                  className="w-full py-2.5 rounded-xl border-2 text-sm font-semibold text-center block transition-colors hover:bg-gray-50"
                  style={{ borderColor: '#0F3460', color: '#0F3460' }}
                >
                  Llamar
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2 text-center">¿Eres asesor? Comparte con tus datos</p>
                <ShareButton propertyId={property.id} />
              </div>
            </div>

            {/* Property ID */}
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400">ID de propiedad</p>
              <p className="text-sm font-mono font-medium text-gray-700">{property.id.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile floating CTA */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-200 flex gap-2 z-40">
        <WhatsAppButton phone={advisor.phone} message={whatsappMsg} className="flex-1" />
        <ShareButton propertyId={property.id} compact />
      </div>
    </div>
  )
}
