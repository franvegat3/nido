'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, ArrowLeft, Mail, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function ResetPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/nueva-contrasena`,
    })

    setLoading(false)
    if (resetError) {
      setError('No encontramos una cuenta con ese email.')
      return
    }
    setSent(true)
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#F8F7F4' }}>
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: '#16C79A15' }}>
            <Check className="w-8 h-8" style={{ color: '#16C79A' }} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Revisa tu correo</h1>
          <p className="text-gray-500 text-sm mb-6">Enviamos instrucciones para restablecer tu contraseña a <strong>{email}</strong></p>
          <Link href="/auth/login" className="w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2" style={{ background: '#0F3460' }}>
            Volver al login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#F8F7F4' }}>
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#0F3460' }}>
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold" style={{ color: '#0F3460' }}>Nido</span>
        </Link>

        <Link href="/auth/login" className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">¿Olvidaste tu contraseña?</h1>
        <p className="text-gray-500 text-sm mb-6">Te enviamos un enlace para crear una nueva.</p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="email" required placeholder="tu@email.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-900 transition-colors" />
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 disabled:opacity-60"
            style={{ background: '#0F3460' }}>
            {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Enviar instrucciones'}
          </button>
        </form>
      </div>
    </div>
  )
}
