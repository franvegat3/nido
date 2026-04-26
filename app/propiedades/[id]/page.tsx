import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Bed, Bath, Car, Maximize2, ChevronLeft, Eye, CheckCircle2 } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { Navbar } from '@/components/Navbar'
import { getProperty, getAdvisor, formatPrice } from '@/lib/data'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { ShareButton } from '@/components/ShareButton'
import { GalleryViewer } from '@/components/GalleryViewer'

// Allow dynamic paths not in generateStaticParams (Supabase UUID IDs)
export const dynamicParams = true

export async function generateStaticParams() {
  const { PROPERTIES } = await import('@/lib/data')
  return PROPERTIES.map((p) => ({ id: p.id }))
}

type AdvisorInfo = {
  name: string
  phone: string
  agency: string
  photo: string | null
  bio: string | null
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let title = ''
  let description = ''
  let type = ''
  let operation: 'Venta' | 'Renta' = 'Venta'
  let price = 0
  let area = 0
  let bedrooms: number | null = null
  let bathrooms: number | null = null
  let parking: number | null = null
  let address = ''
  let colonia = ''
  let city = ''
  let state = ''
  let amenities: string[] = []
  let images: string[] = []
  let views = 0
  let propertyId = id
  let advisor: AdvisorInfo = { name: 'Asesor Nido', phone: '', agency: 'Nido Inmobiliario', photo: null, bio: null }

  // Try Supabase first (UUID format has dashes)
  if (id.includes('-') && id.length > 20) {
    const supabaseServer = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false } }
    )

    const { data: row } = await supabaseServer
      .from('properties')
      .select('*')
      .eq('id', id)
      .eq('active', true)
      .single()

    if (row) {
      title = row.title
      description = row.description
      type = row.type
      operation = row.operation
      price = row.price
      area = row.area
      bedrooms = row.bedrooms
      bathrooms = row.bathrooms
      parking = row.parking
      address = row.address
      colonia = row.colonia
      city = row.city
      state = row.state
      amenities = row.amenities
      images = row.images
      views = row.views
      propertyId = row.id

      // Increment views (fire and forget)
      supabaseServer.rpc('increment_property_views', { property_id: id }).then(() => {})

      // Get advisor profile
      const { data: profile } = await supabaseServer
        .from('profiles')
        .select('name, phone, agency, photo')
        .eq('id', row.owner_id)
        .single()

      if (profile) {
        advisor = {
          name: profile.name,
          phone: profile.phone,
          agency: profile.agency ?? 'Asesor Independiente',
          photo: profile.photo,
          bio: null,
        }
      }
    } else {
      notFound()
    }
  } else {
    // Fall back to mock data
    const mockProperty = getProperty(id)
    if (!mockProperty) notFound()

    const mockAdvisor = getAdvisor(mockProperty.ownerId)!
    title = mockProperty.title
    description = mockProperty.description
    type = mockProperty.type
    operation = mockProperty.operation
    price = mockProperty.price
    area = mockProperty.area
    bedrooms = mockProperty.bedrooms
    bathrooms = mockProperty.bathrooms
    parking = mockProperty.parking
    address = mockProperty.address
    colonia = mockProperty.colonia
    city = mockProperty.city
    state = mockProperty.state
    amenities = mockProperty.amenities
    images = mockProperty.images
    views = mockProperty.views
    advisor = {
      name: mockAdvisor.name,
      phone: mockAdvisor.phone,
      agency: mockAdvisor.agency,
      photo: mockAdvisor.photo,
      bio: mockAdvisor.bio,
    }
  }

  const whatsappMsg = `Hola, vi la propiedad "${title}" en Nido y me gustaría obtener más información.`
  const initials = advisor.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto w-full px-4 py-3">
        <Link href="/propiedades" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
          <ChevronLeft className="w-4 h-4" />
          Volver a resultados
        </Link>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pb-24 md:pb-8">
        <GalleryViewer images={images.length > 0 ? images : ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800']} title={title} />

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${operation === 'Venta' ? 'bg-blue-900 text-white' : 'bg-amber-500 text-white'}`}>
                  {operation === 'Venta' ? 'En Venta' : 'En Renta'}
                </span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">{type}</span>
                <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
                  <Eye className="w-3.5 h-3.5" />
                  {views} vistas
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
              <p className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                {[address, colonia, city, state].filter(Boolean).join(', ')}
              </p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold" style={{ color: '#0F3460' }}>{formatPrice(price)}</span>
                {operation === 'Renta' && <span className="text-gray-500 mb-1">/mes</span>}
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {area > 0 && (
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <Maximize2 className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                  <div className="font-semibold text-gray-900 text-sm">{area}m²</div>
                  <div className="text-xs text-gray-400">Superficie</div>
                </div>
              )}
              {bedrooms !== null && (
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <Bed className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                  <div className="font-semibold text-gray-900 text-sm">{bedrooms}</div>
                  <div className="text-xs text-gray-400">Recámaras</div>
                </div>
              )}
              {bathrooms !== null && (
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <Bath className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                  <div className="font-semibold text-gray-900 text-sm">{bathrooms}</div>
                  <div className="text-xs text-gray-400">Baños</div>
                </div>
              )}
              {parking !== null && (
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <Car className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                  <div className="font-semibold text-gray-900 text-sm">{parking}</div>
                  <div className="text-xs text-gray-400">Estacionamiento</div>
                </div>
              )}
            </div>

            {description && (
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-3">Descripción</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            )}

            {amenities.length > 0 && (
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-3">Características</h2>
                <div className="grid grid-cols-2 gap-2">
                  {amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#16C79A' }} />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">Ubicación</h2>
              <div className="rounded-xl overflow-hidden bg-gray-100 h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">{colonia}, {city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-20">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Contactar asesor</h3>
              <div className="flex items-center gap-3 mb-4">
                {advisor.photo ? (
                  <img src={advisor.photo} alt={advisor.name} className="w-14 h-14 rounded-full object-cover border-2 border-gray-100" />
                ) : (
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold border-2 border-gray-100" style={{ background: '#0F3460' }}>
                    {initials}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-gray-900">{advisor.name}</div>
                  <div className="text-xs text-gray-500">{advisor.agency}</div>
                </div>
              </div>

              {advisor.bio && (
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">{advisor.bio}</p>
              )}

              {advisor.phone && (
                <div className="space-y-2">
                  <WhatsAppButton phone={advisor.phone} message={whatsappMsg} />
                  <a href={`tel:${advisor.phone}`}
                    className="w-full py-2.5 rounded-xl border-2 text-sm font-semibold text-center block transition-colors hover:bg-gray-50"
                    style={{ borderColor: '#0F3460', color: '#0F3460' }}>
                    Llamar
                  </a>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2 text-center">¿Eres asesor? Comparte con tus datos</p>
                <ShareButton propertyId={propertyId} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile floating CTA */}
      {advisor.phone && (
        <div className="md:hidden fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-200 flex gap-2 z-40">
          <WhatsAppButton phone={advisor.phone} message={whatsappMsg} className="flex-1" />
          <ShareButton propertyId={propertyId} compact />
        </div>
      )}
    </div>
  )
}
