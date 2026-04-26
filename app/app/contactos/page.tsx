import { Users, MessageCircle, Phone, Search } from 'lucide-react'
import { ADVISORS } from '@/lib/data'

const contacts = [
  { name: 'María García', phone: '+52 33 9876 0001', type: 'cliente', lastContact: 'Hoy', property: 'Casa en Providencia' },
  { name: 'Roberto Leal', phone: '+52 81 1234 5678', type: 'colega', lastContact: 'Ayer', property: 'Dept. Chapalita' },
  { name: 'Ana Martínez', phone: '+52 33 5555 9999', type: 'cliente', lastContact: '23 abr', property: 'Terreno Zapopan' },
  { name: 'Carlos Torres', phone: '+52 55 8888 1234', type: 'colega', lastContact: '20 abr', property: 'Local Vallarta' },
  { name: 'Sofía Ramos', phone: '+52 33 2222 3333', type: 'cliente', lastContact: '18 abr', property: 'Casa Monterrey' },
]

export default function ContactosPage() {
  return (
    <div className="max-w-xl space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Contactos</h1>
        <p className="text-sm text-gray-500">Clientes y colegas que te contactaron</p>
      </div>

      <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border border-gray-200">
        <Search className="w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Buscar contactos..." className="flex-1 bg-transparent text-sm outline-none text-gray-900 placeholder:text-gray-400" />
      </div>

      <div className="space-y-2">
        {contacts.map((contact) => (
          <div key={contact.name} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: contact.type === 'cliente' ? '#0F3460' : '#E8A020' }}>
              {contact.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm">{contact.name}</div>
              <div className="text-xs text-gray-500 truncate">{contact.property}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${contact.type === 'cliente' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
                  {contact.type}
                </span>
                <span className="text-xs text-gray-400">{contact.lastContact}</span>
              </div>
            </div>
            <div className="flex gap-1.5">
              <a
                href={`https://wa.me/${contact.phone.replace(/\D/g, '')}?text=Hola ${contact.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: '#25D36615', color: '#25D366' }}
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="w-8 h-8 rounded-xl flex items-center justify-center bg-gray-100 text-gray-600"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
