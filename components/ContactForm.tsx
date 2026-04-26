'use client'

import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Props = {
  propertyId: string
  advisorId: string
}

export function ContactForm({ propertyId, advisorId }: Props) {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError('')

    const { error: dbError } = await supabase.from('leads').insert({
      property_id: propertyId,
      advisor_id: advisorId,
      name: form.name.trim(),
      phone: form.phone.trim(),
      message: form.message.trim() || null,
      source: 'form' as const,
    })

    setSending(false)

    if (dbError) {
      setError('No se pudo enviar. Intenta de nuevo.')
      return
    }

    setSent(true)
  }

  if (sent) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: '#16C79A15' }}>
          <Check className="w-6 h-6" style={{ color: '#16C79A' }} />
        </div>
        <p className="font-semibold text-gray-900 mb-1">¡Mensaje enviado!</p>
        <p className="text-sm text-gray-500">El asesor se comunicará contigo a la brevedad.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="font-semibold text-gray-900 mb-1">¿Te interesa esta propiedad?</h2>
      <p className="text-xs text-gray-500 mb-3">Déjanos tus datos y el asesor te contacta hoy</p>

      {error && (
        <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
      )}

      <div>
        <label className="text-xs font-medium text-gray-600 mb-1 block">Tu nombre *</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-900 transition-colors bg-white"
          placeholder="Juan García"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600 mb-1 block">WhatsApp / Teléfono *</label>
        <input
          type="tel"
          required
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-900 transition-colors bg-white"
          placeholder="+52 33 1234 5678"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600 mb-1 block">Mensaje (opcional)</label>
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-900 transition-colors resize-none bg-white"
          placeholder="Me interesa, ¿cuándo podemos agendar una visita?"
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: '#0F3460' }}
      >
        {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Solicitar información'}
      </button>

      <p className="text-xs text-gray-400 text-center">Al enviar aceptas que el asesor te contacte por WhatsApp</p>
    </form>
  )
}
