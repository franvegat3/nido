import Link from 'next/link'
import { Search, MapPin, ChevronRight, Star, Users, TrendingUp, Smartphone, Share2, DollarSign } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { PropertyCard } from '@/components/PropertyCard'
import { PROPERTIES, ADVISORS, getAdvisor } from '@/lib/data'
import { SearchBar } from '@/components/SearchBar'

export default function Home() {
  const featuredProperties = PROPERTIES.filter((p) => p.published && !p.sold).slice(0, 6)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section
        className="relative text-white py-16 px-4 md:py-24"
        style={{
          background: 'linear-gradient(135deg, #0F3460 0%, #1a4b8a 60%, #0d2d52 100%)',
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #E8A020 0%, transparent 50%), radial-gradient(circle at 80% 20%, #16C79A 0%, transparent 40%)' }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Prueba gratis 30 días — Sin tarjeta de crédito
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Tu inventario inmobiliario,
            <br />
            <span style={{ color: '#E8A020' }}>siempre en tu celular</span>
          </h1>

          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Publica propiedades en 3 minutos, compártelas con tus clientes con tus datos de contacto, y cierra más ventas. Desde $299 MXN/mes.
          </p>

          {/* Search bar */}
          <SearchBar />

          {/* Quick filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['Guadalajara', 'Monterrey', 'CDMX', 'Zapopan', 'San Pedro'].map((city) => (
              <Link
                key={city}
                href={`/propiedades?ciudad=${city}`}
                className="text-sm text-blue-200 hover:text-white border border-white/20 hover:border-white/40 rounded-full px-3 py-1 transition-colors"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-bold" style={{ color: '#0F3460' }}>+12,400</div>
            <div className="text-xs text-gray-500">Propiedades activas</div>
          </div>
          <div>
            <div className="text-xl font-bold" style={{ color: '#0F3460' }}>+3,200</div>
            <div className="text-xs text-gray-500">Asesores registrados</div>
          </div>
          <div>
            <div className="text-xl font-bold" style={{ color: '#0F3460' }}>$299</div>
            <div className="text-xs text-gray-500">MXN/mes desde</div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-10 px-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Propiedades recientes</h2>
            <p className="text-sm text-gray-500">Descubre las últimas publicaciones</p>
          </div>
          <Link href="/propiedades" className="flex items-center gap-1 text-sm font-medium" style={{ color: '#0F3460' }}>
            Ver todas <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} advisor={getAdvisor(property.ownerId)} />
          ))}
        </div>
      </section>

      {/* Features section */}
      <section className="py-12 px-4" style={{ background: '#F0EEE9' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Por qué elegir Nido?</h2>
            <p className="text-gray-500">Diseñado por y para asesores inmobiliarios en México</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Smartphone,
                title: 'Mobile-first',
                desc: 'Toma fotos, sube la propiedad y compártela — todo desde tu celular en menos de 3 minutos.',
                color: '#0F3460',
              },
              {
                icon: Share2,
                title: 'Comparte con tus datos',
                desc: 'Cuando un colega comparte tu propiedad, aparece con su nombre y contacto. El crédito siempre va al que cierra.',
                color: '#E8A020',
              },
              {
                icon: DollarSign,
                title: 'Precio justo',
                desc: 'Inventario ilimitado desde $299 MXN/mes. Sin límites por propiedad. Sin tarifas ocultas.',
                color: '#16C79A',
              },
              {
                icon: Search,
                title: 'Buscador público',
                desc: 'Tu cliente final puede buscar propiedades sin registrarse. Más visibilidad para tu inventario.',
                color: '#0F3460',
              },
              {
                icon: Users,
                title: 'Bolsa colaborativa',
                desc: 'Accede al inventario de tus colegas y comparte comisiones. La red que te faltaba.',
                color: '#E8A020',
              },
              {
                icon: TrendingUp,
                title: 'Analítica real',
                desc: 'Mira cuántas personas vieron tu propiedad, desde dónde y qué te contactaron. Toma mejores decisiones.',
                color: '#16C79A',
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}15` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor comparison */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Por qué Nido es diferente?</h2>
            <p className="text-gray-500">Compara con las plataformas que ya conoces</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-gray-500 font-medium"></th>
                  <th className="py-3 px-4 text-center">
                    <div className="text-gray-400 text-xs font-medium">EasyBroker</div>
                    <div className="text-gray-900 font-bold text-base">$699</div>
                    <div className="text-gray-400 text-xs">/asesor/mes</div>
                  </th>
                  <th className="py-3 px-4 text-center">
                    <div className="text-gray-400 text-xs font-medium">Inmuebles24</div>
                    <div className="text-gray-900 font-bold text-base">Variable</div>
                    <div className="text-gray-400 text-xs">por propiedad</div>
                  </th>
                  <th className="py-3 px-4 text-center rounded-t-xl" style={{ background: '#0F3460' }}>
                    <div className="text-blue-200 text-xs font-medium">Nido</div>
                    <div className="text-white font-bold text-base">$299</div>
                    <div className="text-blue-200 text-xs">plano por agencia</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Propiedades ilimitadas', false, false, true],
                  ['Precio fijo sin sorpresas', false, false, true],
                  ['Link con tus datos', true, false, true],
                  ['Foto desde celular en 3 min', false, false, true],
                  ['30 días gratis sin tarjeta', false, false, true],
                  ['Bolsa colaborativa', true, false, true],
                ].map(([feature, eb, i24, nido], idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-3 px-4 text-gray-700">{feature as string}</td>
                    <td className="py-3 px-4 text-center">{eb ? '✓' : <span className="text-gray-300">✗</span>}</td>
                    <td className="py-3 px-4 text-center">{i24 ? '✓' : <span className="text-gray-300">✗</span>}</td>
                    <td className="py-3 px-4 text-center font-bold rounded-none" style={{ background: '#0F346010', color: '#16C79A' }}>
                      {nido ? '✓' : <span className="text-gray-300">✗</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-4">EasyBroker subió precios en enero 2026. Con Nido pagas <strong>$299 planos</strong> sin importar cuántos asesores o propiedades tenga tu agencia.</p>
            <Link href="/auth/registro"
              className="inline-block px-6 py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
              style={{ background: '#0F3460' }}>
              Empieza gratis — sin tarjeta
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Precios claros, sin sorpresas</h2>
          <p className="text-gray-500 mb-8">Cancela cuando quieras. Sin contratos. IVA incluido.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { plan: 'Starter', price: '$299', features: ['Inventario ilimitado', 'Ficha técnica con fotos', 'Links con rebranding', 'WhatsApp integrado', 'Buscador público'], highlight: false },
              { plan: 'Pro', price: '$599', features: ['Todo en Starter', 'Analytics avanzado', 'PDF de fichas', 'Push notifications', 'Pipeline de leads'], highlight: true },
              { plan: 'Team', price: '$1,199', features: ['Todo en Pro', 'Hasta 10 asesores', 'Bolsa compartida', 'Dashboard de equipo', 'Soporte prioritario'], highlight: false },
            ].map(({ plan, price, features, highlight }) => (
              <div
                key={plan}
                className={`rounded-2xl p-6 border-2 flex flex-col ${highlight ? 'border-blue-900 shadow-lg' : 'border-gray-100'}`}
                style={highlight ? { background: '#0F3460', color: 'white' } : {}}
              >
                {highlight && (
                  <span className="text-xs font-semibold bg-amber-500 text-white rounded-full px-3 py-1 self-start mb-3">Más popular</span>
                )}
                <div className={`text-sm font-medium mb-1 ${highlight ? 'text-blue-200' : 'text-gray-500'}`}>{plan}</div>
                <div className={`text-3xl font-bold mb-1 ${highlight ? 'text-white' : 'text-gray-900'}`}>
                  {price} <span className={`text-sm font-normal ${highlight ? 'text-blue-200' : 'text-gray-500'}`}>MXN/mes</span>
                </div>
                <ul className="mt-4 flex-1 space-y-2">
                  {features.map((f) => (
                    <li key={f} className={`text-sm flex items-center gap-2 ${highlight ? 'text-blue-100' : 'text-gray-600'}`}>
                      <Star className="w-3.5 h-3.5 flex-shrink-0" style={{ color: highlight ? '#E8A020' : '#16C79A' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/registro"
                  className={`mt-6 w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-opacity hover:opacity-90 ${highlight ? 'bg-amber-500 text-white' : 'text-white'}`}
                  style={highlight ? {} : { background: '#0F3460' }}
                >
                  Empezar gratis
                </Link>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-400 mt-6">30 días gratis sin tarjeta de crédito · Cancela cuando quieras</p>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-12 px-4 text-white text-center" style={{ background: 'linear-gradient(135deg, #0F3460, #1a4b8a)' }}>
        <h2 className="text-2xl font-bold mb-3">Empieza hoy — gratis</h2>
        <p className="text-blue-200 mb-6 max-w-md mx-auto">Únete a más de 3,200 asesores inmobiliarios que ya usan Nido para publicar y compartir propiedades.</p>
        <Link
          href="/auth/registro"
          className="inline-block px-8 py-3 rounded-xl font-semibold text-blue-900 transition-transform hover:scale-105"
          style={{ background: '#E8A020' }}
        >
          Crear cuenta gratis
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#0F3460' }}>
              <Search className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold" style={{ color: '#0F3460' }}>Nido</span>
          </div>
          <p className="text-xs text-gray-400">© 2026 Nido Inmobiliario · Hecho con ❤️ en México</p>
          <div className="flex gap-4 text-xs text-gray-400">
            <Link href="#" className="hover:text-gray-600">Privacidad</Link>
            <Link href="#" className="hover:text-gray-600">Términos</Link>
            <Link href="#" className="hover:text-gray-600">Contacto</Link>
          </div>
        </div>
      </footer>

      {/* Mobile bottom nav spacer */}
      <div className="h-16 md:hidden" />
    </div>
  )
}
