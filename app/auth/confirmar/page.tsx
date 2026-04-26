'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Mail, Home, ArrowRight } from 'lucide-react'

function ConfirmarContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') ?? ''

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#F8F7F4' }}>
      <div className="w-full max-w-sm text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#0F3460' }}>
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold" style={{ color: '#0F3460' }}>Nido</span>
        </Link>

        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: '#0F346015' }}>
          <Mail className="w-8 h-8" style={{ color: '#0F3460' }} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Revisa tu correo</h1>
        <p className="text-gray-500 text-sm mb-2">
          Te enviamos un enlace de confirmación a:
        </p>
        <p className="font-semibold text-gray-800 text-sm mb-6">{email}</p>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-left mb-6">
          <p className="text-sm text-blue-800 font-medium mb-1">¿Cómo activar tu cuenta?</p>
          <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
            <li>Abre tu bandeja de entrada (o spam)</li>
            <li>Haz clic en el enlace de confirmación</li>
            <li>Regresa aquí e inicia sesión</li>
          </ol>
        </div>

        <Link href="/auth/login"
          className="w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
          style={{ background: '#0F3460' }}>
          Ir a iniciar sesión
          <ArrowRight className="w-4 h-4" />
        </Link>

        <p className="text-xs text-gray-400 mt-4">
          ¿No llegó el correo?{' '}
          <Link href="/auth/registro" className="underline">Vuelve a registrarte</Link>
        </p>
      </div>
    </div>
  )
}

export default function ConfirmarPage() {
  return (
    <Suspense>
      <ConfirmarContent />
    </Suspense>
  )
}
