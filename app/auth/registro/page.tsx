'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Home, Check, ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const PERKS = [
  'Inventario ilimitado de propiedades',
  'Compartir fichas con tus datos',
  'Buscador público para tus clientes',
  'WhatsApp integrado',
  '30 días gratis, sin tarjeta',
]

export default function RegistroPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    agency: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (step === 1) { setStep(2); return }

    setLoading(true)
    setError('')

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          name: form.name,
          phone: form.phone,
          agency: form.agency || null,
        },
      },
    })

    if (signUpError) {
      const msg = signUpError.message
      if (msg.includes('already registered') || msg.includes('already been registered')) {
        setError('Este email ya tiene una cuenta. Inicia sesión.')
      } else if (msg.includes('password')) {
        setError('La contraseña debe tener al menos 6 caracteres.')
      } else {
        setError(`Error: ${msg}`)
      }
      setLoading(false)
      return
    }

    // If Supabase requires email confirmation, session will be null
    if (!signUpData.session) {
      // Email confirmation required — redirect to a confirmation screen
      setLoading(false)
      router.push('/auth/confirmar?email=' + encodeURIComponent(form.email))
      return
    }

    setLoading(false)
    setSuccess(true)
    setTimeout(() => { router.push('/app'); router.refresh() }, 1800)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#F8F7F4' }}>
        <div className="text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: '#16C79A15' }}>
            <Check className="w-10 h-10" style={{ color: '#16C79A' }} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Bienvenido a Nido!</h2>
          <p className="text-gray-500 text-sm mb-1">Tu cuenta está lista.</p>
          <p className="text-gray-400 text-xs">Preparando tu panel...</p>
          <div className="w-6 h-6 border-2 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto mt-5" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#F8F7F4' }}>
      {/* Left — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#0F3460' }}>
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold" style={{ color: '#0F3460' }}>Nido</span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Empieza gratis hoy</h1>
          <p className="text-gray-500 text-sm mb-6">30 días de prueba. Sin tarjeta de crédito.</p>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'text-white' : 'bg-gray-200 text-gray-400'}`} style={step >= 1 ? { background: '#0F3460' } : {}}>
              {step > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <div className={`flex-1 h-0.5 ${step > 1 ? 'bg-blue-900' : 'bg-gray-200'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'text-white' : 'bg-gray-200 text-gray-400'}`} style={step >= 2 ? { background: '#0F3460' } : {}}>
              2
            </div>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Nombre completo</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Tu nombre"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Teléfono (WhatsApp)</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="+52 33 1234 5678"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-900 transition-colors"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Nombre de agencia (opcional)</label>
                  <input
                    name="agency"
                    type="text"
                    placeholder="Tu Inmobiliaria"
                    value={form.agency}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Contraseña</label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPass ? 'text' : 'password'}
                      required
                      minLength={8}
                      placeholder="Mínimo 8 caracteres"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-900 transition-colors pr-10"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  Al crear cuenta aceptas nuestros{' '}
                  <Link href="#" className="underline">Términos de Servicio</Link> y{' '}
                  <Link href="#" className="underline">Política de Privacidad</Link>.
                </p>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ background: '#0F3460' }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {step === 1 ? 'Continuar' : 'Crear cuenta gratis'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {step === 1 && (
              <button
                type="button"
                className="w-full py-3 rounded-xl font-semibold text-gray-700 text-sm flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continuar con Google
              </button>
            )}
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link href="/auth/login" className="font-medium" style={{ color: '#0F3460' }}>
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>

      {/* Right — perks (hidden on mobile) */}
      <div className="hidden md:flex flex-col justify-center px-12 py-12 w-96" style={{ background: '#0F3460' }}>
        <h2 className="text-2xl font-bold text-white mb-2">Todo lo que necesitas</h2>
        <p className="text-blue-200 text-sm mb-8">para vender más desde tu celular</p>

        <div className="space-y-4">
          {PERKS.map((perk) => (
            <div key={perk} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#E8A020' }}>
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-blue-100 text-sm">{perk}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            {'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: '#E8A020' }}>{s}</span>)}
          </div>
          <p className="text-white text-sm italic">"Antes tardaba 20 minutos publicando en InMuebles24. Ahora lo hago en 3 minutos desde el celular y lo comparto directo."</p>
          <p className="text-blue-300 text-xs mt-2">— Carlos R., Asesor en Guadalajara</p>
        </div>
      </div>
    </div>
  )
}
