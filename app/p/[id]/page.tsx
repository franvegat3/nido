import { notFound } from 'next/navigation'
import { MapPin, Bed, Bath, Car, Maximize2, Eye, CheckCircle2, Info, Phone } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { getProperty, getAdvisor, formatPrice } from '@/lib/data'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { GalleryViewer } from '@/components/GalleryViewer'
import { ContactForm } from '@/components/ContactForm'

export const dynamicParams = true

export async function generateStaticParams() {
  const { PROPERTIES } = await import('@/lib/data')
  return PROPERTIES.map((p) => ({ id: p.id }))
}

type AdvisorInfo = {
  id: string
  name: string
  phone: string
  agency: string
  photo: string | null
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

  // --- Real Supabase property ---
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

    if (!row) notFound()

    // Increment views
    supabaseServer.rpc('increment_property_views', { property_id: id }).then(() => {})

    // Load advisor: prefer the ?asesor= query param, fallback to owner
    let advisor: AdvisorInfo = { id: row.owner_id, name: 'Asesor Nido', phone: '', agency: 'Nido Inmobiliario', photo: null }
    const lookupId = advisorId ?? row.owner_id

    const { data: profile } = await supabaseServer
      .from('profiles')
      .select('id, name, phone, agency, photo')
      .eq('id', lookupId)
      .single()

    if (profile) {
      advisor = {
        id: profile.id,
        name: profile.name,
        phone: profile.phone,
        agency: profile.agency ?? 'Asesor Independiente',
        photo: profile.photo,
      }
    } else if (advisorId) {
      // Fallback: load owner
      const { data: ownerProfile } = await supabaseServer
        .from('profiles')
        .select('id, name, phone, agency, photo')
        .eq('id', row.owner_id)
        .single()
      if (ownerProfile) {
        advisor = { id: ownerProfile.id, name: ownerProfile.name, phone: ownerProfile.phone, agency: ownerProfile.agency ?? 'Asesor Independiente', photo: ownerProfile.photo }
      }
    }

    const whatsappMsg = `Hola ${advisor.name}, vi la propiedad "${row.title}" en Nido y me gustaría obtener más información.`
    const initials = advisor.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()

    return (
      <SharedPropertyView
        id={id}
        title={row.title}
        description={row.description}
        type={row.type}
        operation={row.operation}
        price={row.price}
        area={row.area}
        bedrooms={row.bedrooms}
        bathrooms={row.bathrooms}
        parking={row.parking}
        colonia={row.colonia}
        city={row.city}
        state={row.state}
        amenities={row.amenities}
        images={row.images}
        views={row.views}
        advisor={advisor}
        advisorId={advisor.id}
        whatsappMsg={whatsappMsg}
        initials={initials}
        showContactForm
      />
    )
  }

  // --- Mock property fallback ---
  const property = getProperty(id)
  if (!property) notFound()

  const sharedAdvisor = advisorId ? getAdvisor(advisorId) : null
  const displayAdvisor = sharedAdvisor ?? getAdvisor(property.ownerId)!
  const isRebranded = sharedAdvisor && sharedAdvisor.id !== property.ownerId
  const whatsappMsg = `Hola ${displayAdvisor.name}, vi la propiedad "${property.title}" en Nido y me gustaría obtener más información.`
  const initials = displayAdvisor.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <SharedPropertyView
      id={property.id}
      title={property.title}
      description={property.description}
      type={property.type}
      operation={property.operation}
      price={property.price}
      area={property.area}
      bedrooms={property.bedrooms}
      bathrooms={property.bathrooms}
      parking={property.parking}
      colonia={property.colonia}
      city={property.city}
      state={property.state}
      amenities={property.amenities}
      images={property.images}
      views={property.views}
      advisor={{ id: displayAdvisor.id, name: displayAdvisor.name, phone: displayAdvisor.phone, agency: displayAdvisor.agency, photo: displayAdvisor.photo }}
      advisorId={displayAdvisor.id}
      whatsappMsg={whatsappMsg}
      initials={initials}
      isRebranded={isRebranded ?? false}
      rebrandedFrom={sharedAdvisor?.name}
      showContactForm={false}
    />
  )
}

function SharedPropertyView({
  id, title, description, type, operation, price, area, bedrooms, bathrooms, parking,
  colonia, city, state, amenities, images, views, advisor, advisorId, whatsappMsg, initials,
  isRebranded = false, rebrandedFrom, showContactForm = false,
}: {
  id: string
  title: string
  description: string
  type: string
  operation: 'Venta' | 'Renta'
  price: number
  area: number
  bedrooms: number | null
  bathrooms: number | null
  parking: number | null
  colonia: string
  city: string
  state: string
  amenities: string[]
  images: string[]
  views: number
  advisor: AdvisorInfo
  advisorId: string
  whatsappMsg: string
  initials: string
  isRebranded?: boolean
  rebrandedFrom?: string
  showContactForm?: boolean
}) {
  return (
    <div className="min-h-screen" style={{ background: '#F8F7F4' }}>
      {/* Branded header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          {advisor.photo ? (
            <img src={advisor.photo} alt={advisor.name} className="w-9 h-9 rounded-full object-cover border-2 border-gray-100 flex-shrink-0" />
          ) : (
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 border-2 border-gray-100" style={{ background: '#0F3460' }}>
              {initials}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 text-sm truncate">{advisor.name}</div>
            <div className="text-xs text-gray-500 truncate">{advisor.agency}</div>
          </div>
          {advisor.phone && (
            <a href={`tel:${advisor.phone}`}
              className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 flex-shrink-0">
              <Phone className="w-3.5 h-3.5" />
              Llamar
            </a>
          )}
        </div>
      </header>

      {isRebranded && rebrandedFrom && (
        <div className="max-w-2xl mx-auto px-4 pt-3">
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>Compartida por <strong>{rebrandedFrom}</strong>. El cliente ve los datos del asesor automáticamente.</span>
          </div>
        </div>
      )}

      <main className="max-w-2xl mx-auto px-4 py-4 pb-36">
        <GalleryViewer images={images.length > 0 ? images : ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800']} title={title} />

        <div className="mt-5">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${operation === 'Venta' ? 'bg-blue-900 text-white' : 'bg-amber-500 text-white'}`}>
              {operation === 'Venta' ? 'En Venta' : 'En Renta'}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">{type}</span>
            <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
              <Eye className="w-3.5 h-3.5" />{views} vistas
            </span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
            <MapPin className="w-4 h-4" />{colonia}, {city}, {state}
          </p>
          <div className="text-3xl font-bold" style={{ color: '#0F3460' }}>
            {formatPrice(price)}
            {operation === 'Renta' && <span className="text-base font-normal text-gray-500 ml-1">/mes</span>}
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          {area > 0 && (
            <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
              <Maximize2 className="w-5 h-5 mx-auto mb-1 text-gray-400" />
              <div className="font-semibold text-gray-900 text-sm">{area}m²</div>
              <div className="text-xs text-gray-400">Superficie</div>
            </div>
          )}
          {bedrooms !== null && (
            <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
              <Bed className="w-5 h-5 mx-auto mb-1 text-gray-400" />
              <div className="font-semibold text-gray-900 text-sm">{bedrooms}</div>
              <div className="text-xs text-gray-400">Recámaras</div>
            </div>
          )}
          {bathrooms !== null && (
            <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
              <Bath className="w-5 h-5 mx-auto mb-1 text-gray-400" />
              <div className="font-semibold text-gray-900 text-sm">{bathrooms}</div>
              <div className="text-xs text-gray-400">Baños</div>
            </div>
          )}
          {parking !== null && (
            <div className="bg-white rounded-xl p-3 text-center border border-gray-100">
              <Car className="w-5 h-5 mx-auto mb-1 text-gray-400" />
              <div className="font-semibold text-gray-900 text-sm">{parking}</div>
              <div className="text-xs text-gray-400">Est.</div>
            </div>
          )}
        </div>

        {description && (
          <div className="mt-4 bg-white rounded-2xl p-5 border border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-3">Descripción</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>
        )}

        {amenities.length > 0 && (
          <div className="mt-4 bg-white rounded-2xl p-5 border border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-3">Características</h2>
            <div className="grid grid-cols-2 gap-2">
              {amenities.map((a) => (
                <div key={a} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#16C79A' }} />
                  {a}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Map placeholder */}
        <div className="mt-4 bg-white rounded-2xl p-5 border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-3">Ubicación</h2>
          <div className="rounded-xl overflow-hidden bg-blue-50 border border-blue-100 h-36 flex flex-col items-center justify-center gap-2">
            <MapPin className="w-8 h-8" style={{ color: '#0F3460' }} />
            <p className="text-sm font-medium text-gray-700">{colonia}, {city}</p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${colonia}, ${city}, ${state}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium px-3 py-1.5 rounded-lg text-white"
              style={{ background: '#0F3460' }}
            >
              Ver en Google Maps
            </a>
          </div>
        </div>

        {/* Contact form — only for real Supabase properties */}
        {showContactForm && (
          <div className="mt-4 bg-white rounded-2xl p-5 border border-gray-100">
            <ContactForm propertyId={id} advisorId={advisorId} />
          </div>
        )}

        {/* Advisor card */}
        <div className="mt-4 bg-white rounded-2xl p-5 border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-4">Tu asesor de confianza</h2>
          <div className="flex items-center gap-3 mb-4">
            {advisor.photo ? (
              <img src={advisor.photo} alt={advisor.name} className="w-14 h-14 rounded-full object-cover border-2 border-gray-100" />
            ) : (
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold border-2 border-gray-100" style={{ background: '#0F3460' }}>
                {initials}
              </div>
            )}
            <div>
              <div className="font-bold text-gray-900">{advisor.name}</div>
              <div className="text-sm text-gray-500">{advisor.agency}</div>
            </div>
          </div>
          {advisor.phone && (
            <div className="space-y-2">
              <WhatsAppButton phone={advisor.phone} message={whatsappMsg} />
              <a href={`tel:${advisor.phone}`}
                className="w-full py-2.5 rounded-xl border-2 text-sm font-semibold text-center block"
                style={{ borderColor: '#0F3460', color: '#0F3460' }}>
                Llamar al asesor
              </a>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">Propiedad publicada en</p>
          <p className="text-sm font-bold mt-0.5" style={{ color: '#0F3460' }}>Nido Inmobiliario</p>
        </div>
      </main>

      {/* Sticky WhatsApp CTA */}
      {advisor.phone && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
          <WhatsAppButton phone={advisor.phone} message={whatsappMsg} />
        </div>
      )}
    </div>
  )
}
