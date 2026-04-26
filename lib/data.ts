export type Property = {
  id: string
  title: string
  type: 'Casa' | 'Departamento' | 'Terreno' | 'Local Comercial' | 'Oficina'
  operation: 'Venta' | 'Renta'
  price: number
  currency: 'MXN'
  area: number
  bedrooms: number | null
  bathrooms: number | null
  parking: number | null
  address: string
  colonia: string
  city: string
  state: string
  description: string
  amenities: string[]
  images: string[]
  lat: number
  lng: number
  ownerId: string
  published: boolean
  sold: boolean
  createdAt: string
  views: number
}

export type Advisor = {
  id: string
  name: string
  phone: string
  email: string
  photo: string
  agency: string
  license: string
  bio: string
  trialEnds: string
  plan: 'trial' | 'starter' | 'pro' | 'team'
}

export const ADVISORS: Advisor[] = [
  {
    id: 'a1',
    name: 'Francisco Vega',
    phone: '+52 81 9876 5432',
    email: 'francisco@nidoinmobiliario.mx',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    agency: 'Nido Inmobiliario',
    license: 'AMPI-67890',
    bio: 'Asesor con presencia en Guadalajara y Monterrey. Enfocado en ayudar a compradores de primera vez y familias a encontrar su hogar ideal.',
    trialEnds: '2026-05-25',
    plan: 'pro',
  },
  {
    id: 'a2',
    name: 'Carlos Rivera',
    phone: '+52 33 4444 7890',
    email: 'carlos@nidoinmobiliario.mx',
    photo: 'https://randomuser.me/api/portraits/men/55.jpg',
    agency: 'Rivera Bienes Raíces',
    license: 'AMPI-33421',
    bio: 'Especialista en propiedades residenciales en Guadalajara. 8 años de experiencia, más de 150 operaciones cerradas.',
    trialEnds: '2026-06-01',
    plan: 'starter',
  },
  {
    id: 'a3',
    name: 'Sandra López',
    phone: '+52 55 7777 2345',
    email: 'sandra@nidoinmobiliario.mx',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    agency: 'López & Asociados',
    license: 'AMPI-88102',
    bio: 'Experta en mercado de lujo en CDMX y Monterrey. Certificada AMPI. Más de 200 operaciones exitosas en propiedades premium.',
    trialEnds: '2026-05-30',
    plan: 'team',
  },
]

export const PROPERTIES: Property[] = [
  {
    id: 'p1',
    title: 'Casa moderna en Providencia con jardín',
    type: 'Casa',
    operation: 'Venta',
    price: 4800000,
    currency: 'MXN',
    area: 280,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    address: 'Av. Providencia 1234',
    colonia: 'Providencia',
    city: 'Guadalajara',
    state: 'Jalisco',
    description:
      'Hermosa casa de 4 recámaras en la exclusiva colonia Providencia. Amplio jardín, sala de TV, cocina integral de madera con granito. Acabados de lujo. A dos cuadras del Parque Providencia. Excelente ubicación cerca de colegios, restaurantes y centros comerciales.',
    amenities: ['Jardín privado', 'Cocina integral', 'Cuarto de servicio', 'Seguridad 24/7', 'Calefacción', 'AC central', 'Roof garden'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
    ],
    lat: 20.6892,
    lng: -103.3714,
    ownerId: 'a1',
    published: true,
    sold: false,
    createdAt: '2026-04-20',
    views: 342,
  },
  {
    id: 'p2',

    title: 'Departamento en Chapalita con vista al parque',
    type: 'Departamento',
    operation: 'Renta',
    price: 18500,
    currency: 'MXN',
    area: 95,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    address: 'Av. México 2500, Piso 7',
    colonia: 'Chapalita',
    city: 'Guadalajara',
    state: 'Jalisco',
    description:
      'Moderno departamento en el piso 7 con vista panorámica al Parque Chapalita. Totalmente amueblado y equipado. Cocina americana, sala-comedor integrados, 2 recámaras con closets amplios. Edificio con gimnasio, roof garden y vigilancia 24/7.',
    amenities: ['Amueblado', 'Gimnasio', 'Roof garden', 'Vigilancia 24/7', 'Estacionamiento', 'Elevador', 'Pet friendly'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    ],
    lat: 20.6748,
    lng: -103.3892,
    ownerId: 'a2',
    published: true,
    sold: false,
    createdAt: '2026-04-18',
    views: 218,
  },
  {
    id: 'p3',
    title: 'Casa en San Pedro Garza García ideal para familia',
    type: 'Casa',
    operation: 'Venta',
    price: 8200000,
    currency: 'MXN',
    area: 420,
    bedrooms: 5,
    bathrooms: 4,
    parking: 3,
    address: 'Calle Gómez Morín 890',
    colonia: 'Valle Oriente',
    city: 'San Pedro Garza García',
    state: 'Nuevo León',
    description:
      'Residencia de lujo en San Pedro Garza García. 5 recámaras, 4 baños completos, estudio independiente. Alberca, jardín, área de BBQ. Cocina gourmet con isla. Ubicada en privada con vigilancia. A 5 minutos de Landmark y Centrito Valle.',
    amenities: ['Alberca', 'Jardín', 'BBQ', 'Cocina gourmet', 'Estudio', 'Bodega', 'Cuarto de TV', 'Cisterna'],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    ],
    lat: 25.6572,
    lng: -100.4049,
    ownerId: 'a2',
    published: true,
    sold: false,
    createdAt: '2026-04-15',
    views: 567,
  },
  {
    id: 'p4',
    title: 'Departamento de lujo en Polanco, CDMX',
    type: 'Departamento',
    operation: 'Venta',
    price: 12500000,
    currency: 'MXN',
    area: 180,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    address: 'Av. Presidente Masaryk 456, Piso 12',
    colonia: 'Polanco',
    city: 'Ciudad de México',
    state: 'CDMX',
    description:
      'Exclusivo departamento en Torre de lujo en Polanco. Pisos de mármol, cocina italiana, terracería privada de 40m². 3 recámaras en suite. Amenidades de clase mundial: spa, concierge 24/7, cine, business center.',
    amenities: ['Terraza privada', 'Spa', 'Concierge', 'Cine', 'Business center', 'Sommelier', 'Valet parking'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80',
    ],
    lat: 19.4326,
    lng: -99.1740,
    ownerId: 'a3',
    published: true,
    sold: false,
    createdAt: '2026-04-12',
    views: 891,
  },
  {
    id: 'p5',
    title: 'Terreno en Zapopan para desarrollo residencial',
    type: 'Terreno',
    operation: 'Venta',
    price: 3200000,
    currency: 'MXN',
    area: 650,
    bedrooms: null,
    bathrooms: null,
    parking: null,
    address: 'Blvd. Puerta de Hierro 890',
    colonia: 'Puerta de Hierro',
    city: 'Zapopan',
    state: 'Jalisco',
    description:
      'Terreno plano de 650m² en zona residencial de alta plusvalía. Escrituras al corriente, sin adeudos. Ideal para construcción de casa o desarrollo de 4-5 departamentos. Frente a boulevard principal con todos los servicios.',
    amenities: ['Escrituras limpias', 'Servicios instalados', 'Terreno plano', 'Acceso a boulevard', 'Uso de suelo habitacional'],
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
    ],
    lat: 20.7214,
    lng: -103.4418,
    ownerId: 'a1',
    published: true,
    sold: false,
    createdAt: '2026-04-10',
    views: 145,
  },
  {
    id: 'p6',
    title: 'Casa en privada en Coto Santa Fe, Guadalajara',
    type: 'Casa',
    operation: 'Renta',
    price: 32000,
    currency: 'MXN',
    area: 210,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    address: 'Coto Santa Fe, Calle Olmo 45',
    colonia: 'Santa Fe',
    city: 'Guadalajara',
    state: 'Jalisco',
    description:
      'Casa en privada cerrada con vigilancia. 3 recámaras, 2.5 baños, sala de TV, jardín trasero. Cocina equipada. Cuarto de servicio con baño. Excelente mantenimiento. La renta incluye mantenimiento del coto.',
    amenities: ['Privada cerrada', 'Vigilancia', 'Jardín', 'Cuarto de servicio', 'Cocina equipada', 'Área de juegos'],
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
      'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&q=80',
    ],
    lat: 20.6576,
    lng: -103.4204,
    ownerId: 'a2',
    published: true,
    sold: false,
    createdAt: '2026-04-08',
    views: 298,
  },
  {
    id: 'p7',
    title: 'Local comercial en Av. Vallarta zona Rosa',
    type: 'Local Comercial',
    operation: 'Renta',
    price: 45000,
    currency: 'MXN',
    area: 320,
    bedrooms: null,
    bathrooms: 2,
    parking: 5,
    address: 'Av. Vallarta 3444',
    colonia: 'Zona Rosa',
    city: 'Guadalajara',
    state: 'Jalisco',
    description:
      'Amplio local comercial en esquina sobre Av. Vallarta. 320m² en un solo nivel, techo alto, ventanal de piso a techo. Ideal para restaurante, boutique o oficinas. Alta afluencia peatonal y vehicular.',
    amenities: ['Esquina', 'Ventanal', 'Techo alto', 'Bodega trasera', 'Baños independientes', 'Acceso para discapacitados'],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    ],
    lat: 20.6753,
    lng: -103.4012,
    ownerId: 'a3',
    published: true,
    sold: false,
    createdAt: '2026-04-05',
    views: 421,
  },
  {
    id: 'p8',
    title: 'Departamento en Monterrey Centro, piso 5',
    type: 'Departamento',
    operation: 'Renta',
    price: 14000,
    currency: 'MXN',
    area: 75,
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    address: 'Calle Hidalgo 250, Piso 5',
    colonia: 'Centro',
    city: 'Monterrey',
    state: 'Nuevo León',
    description:
      'Departamento moderno en el corazón de Monterrey. Studio amplio convertible en 1 recámara. Vista a la ciudad. Edificio con seguridad y gym. A pasos del metro Centro. Ideal para profesionistas.',
    amenities: ['Gym', 'Vigilancia', 'Elevador', 'Vista a la ciudad', 'Cerca del metro'],
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
    ],
    lat: 25.6714,
    lng: -100.3090,
    ownerId: 'a2',
    published: true,
    sold: false,
    createdAt: '2026-04-03',
    views: 187,
  },
]

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function getAdvisor(id: string): Advisor | undefined {
  return ADVISORS.find((a) => a.id === id)
}

export function getProperty(id: string): Property | undefined {
  return PROPERTIES.find((p) => p.id === id)
}

export function searchProperties(query: {
  keyword?: string
  city?: string
  type?: string
  operation?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
}): Property[] {
  return PROPERTIES.filter((p) => {
    if (!p.published || p.sold) return false
    if (query.keyword) {
      const kw = query.keyword.toLowerCase()
      if (
        !p.title.toLowerCase().includes(kw) &&
        !p.description.toLowerCase().includes(kw) &&
        !p.colonia.toLowerCase().includes(kw) &&
        !p.city.toLowerCase().includes(kw) &&
        !p.address.toLowerCase().includes(kw)
      )
        return false
    }
    if (query.city && !p.city.toLowerCase().includes(query.city.toLowerCase()) && !p.state.toLowerCase().includes(query.city.toLowerCase())) return false
    if (query.type && p.type !== query.type) return false
    if (query.operation && p.operation !== query.operation) return false
    if (query.minPrice && p.price < query.minPrice) return false
    if (query.maxPrice && p.price > query.maxPrice) return false
    if (query.bedrooms && p.bedrooms && p.bedrooms < query.bedrooms) return false
    return true
  })
}
