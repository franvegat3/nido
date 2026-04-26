'use client'

import { useState, useEffect, useMemo } from 'react'
import { MessageCircle, Phone, Search, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Lead = {
  id: string
  name: string
  phone: string
  email: string | null
  message: string | null
  source: string
  created_at: string
  property_id: string | null
}

// Mock contacts for demo when DB is empty
const MOCK_CONTACTS = [
  { id: '1', name: 'María García', phone: '+52 33 9876 0001', email: null, message: 'Me interesa la casa', source: 'whatsapp', created_at: new Date().toISOString(), property_id: null },
  { id: '2', name: 'Roberto Leal', phone: '+52 81 1234 5678', email: 'roberto@email.com', message: null, source: 'form', created_at: new Date(Date.now() - 86400000).toISOString(), property_id: null },
  { id: '3', name: 'Ana Martínez', phone: '+52 33 5555 9999', email: null, message: 'Quiero información', source: 'whatsapp', created_at: new Date(Date.now() - 86400000 * 3).toISOString(), property_id: null },
  { id: '4', name: 'Carlos Torres', phone: '+52 55 8888 1234', email: 'carlos@email.com', message: null, source: 'form', created_at: new Date(Date.now() - 86400000 * 6).toISOString(), property_id: null },
  { id: '5', name: 'Sofía Ramos', phone: '+52 33 2222 3333', email: null, message: 'Cuánto cuesta?', source: 'whatsapp', created_at: new Date(Date.now() - 86400000 * 8).toISOString(), property_id: null },
]

function relativeDate(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Hoy'
  if (days === 1) return 'Ayer'
  return `Hace ${days} días`
}

export default function ContactosPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLeads(MOCK_CONTACTS); setLoading(false); return }

      const { data } = await supabase
        .from('leads')
        .select('*')
        .eq('advisor_id', user.id)
        .order('created_at', { ascending: false })

      setLeads(data && data.length > 0 ? data : MOCK_CONTACTS)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return leads
    const q = query.toLowerCase()
    return leads.filter(
      (c) => c.name.toLowerCase().includes(q) || c.phone.includes(q) || (c.email ?? '').toLowerCase().includes(q)
    )
  }, [leads, query])

  return (
    <div className="max-w-xl space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Contactos</h1>
        <p className="text-sm text-gray-500">{leads.length} personas que te contactaron</p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border border-gray-200">
        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Buscar por nombre, teléfono o email..."
          className="flex-1 bg-transparent text-sm outline-none text-gray-900 placeholder:text-gray-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button onClick={() => setQuery('')}><X className="w-4 h-4 text-gray-400" /></button>
        )}
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => <div key={i} className="bg-white rounded-2xl border border-gray-100 h-20 animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm">
          No encontramos contactos con &ldquo;{query}&rdquo;
          <button onClick={() => setQuery('')} className="block mx-auto mt-2 text-blue-900 underline text-xs">Limpiar búsqueda</button>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((contact) => (
            <div key={contact.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: '#0F3460' }}>
                {contact.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 text-sm">{contact.name}</div>
                <div className="text-xs text-gray-500 truncate">{contact.phone}</div>
                {contact.message && (
                  <div className="text-xs text-gray-400 truncate mt-0.5">&ldquo;{contact.message}&rdquo;</div>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                    {contact.source === 'whatsapp' ? 'WhatsApp' : contact.source === 'form' ? 'Formulario' : 'Llamada'}
                  </span>
                  <span className="text-xs text-gray-400">{relativeDate(contact.created_at)}</span>
                </div>
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                <a
                  href={`https://wa.me/${contact.phone.replace(/\D/g, '')}?text=Hola+${encodeURIComponent(contact.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: '#25D36615', color: '#25D366' }}
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a href={`tel:${contact.phone}`}
                  className="w-8 h-8 rounded-xl flex items-center justify-center bg-gray-100 text-gray-600">
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
