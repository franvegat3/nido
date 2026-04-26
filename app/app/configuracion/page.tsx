'use client'

import { useState, useEffect, useRef } from 'react'
import { Camera, Check, Loader2, Save } from 'lucide-react'
import { supabase, Profile } from '@/lib/supabase'

export default function ConfiguracionPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', agency: '' })
  const photoInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) {
        setProfile(data)
        setForm({ name: data.name, phone: data.phone, agency: data.agency ?? '' })
      }
      setLoading(false)
    }
    load()
  }, [])

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !profile) return

    setUploadingPhoto(true)
    setError('')

    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `profiles/${profile.id}.${ext}`

    const { data, error: upError } = await supabase.storage
      .from('property-images')
      .upload(path, file, { contentType: file.type, upsert: true })

    if (upError) {
      setError(`Error al subir foto: ${upError.message}`)
      setUploadingPhoto(false)
      return
    }

    const { data: urlData } = supabase.storage.from('property-images').getPublicUrl(data.path)
    const photoUrl = urlData.publicUrl

    await supabase.from('profiles').update({ photo: photoUrl }).eq('id', profile.id)
    setProfile((p) => p ? { ...p, photo: photoUrl } : p)
    setUploadingPhoto(false)
    e.target.value = ''
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!profile) return
    setSaving(true)
    setError('')

    const { error: dbError } = await supabase.from('profiles').update({
      name: form.name.trim(),
      phone: form.phone.trim(),
      agency: form.agency.trim() || null,
    }).eq('id', profile.id)

    setSaving(false)

    if (dbError) {
      setError('Error al guardar. Intenta de nuevo.')
      return
    }

    setProfile((p) => p ? { ...p, name: form.name.trim(), phone: form.phone.trim(), agency: form.agency.trim() || null } : p)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading) {
    return (
      <div className="max-w-md space-y-3">
        {[1, 2, 3].map((i) => <div key={i} className="bg-white rounded-2xl border border-gray-100 h-16 animate-pulse" />)}
      </div>
    )
  }

  const initials = form.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || '?'

  return (
    <div className="max-w-md space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Configuración</h1>
        <p className="text-sm text-gray-500">Edita tu perfil de asesor</p>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
      )}

      {/* Photo */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
        <div className="relative">
          <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          {profile?.photo ? (
            <img src={profile.photo} alt={form.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" />
          ) : (
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-bold border-2 border-gray-100" style={{ background: '#0F3460' }}>
              {initials}
            </div>
          )}
          <button
            onClick={() => photoInputRef.current?.click()}
            disabled={uploadingPhoto}
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md"
            style={{ background: '#0F3460' }}
          >
            {uploadingPhoto ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
          </button>
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{form.name || 'Tu nombre'}</p>
          <p className="text-xs text-gray-500">{profile?.email}</p>
          <button onClick={() => photoInputRef.current?.click()} className="text-xs font-medium mt-1" style={{ color: '#0F3460' }}>
            Cambiar foto
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">Nombre completo</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-900 transition-colors"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">Teléfono (WhatsApp)</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-900 transition-colors"
            placeholder="+52 33 1234 5678"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">Inmobiliaria / Agencia (opcional)</label>
          <input
            type="text"
            value={form.agency}
            onChange={(e) => setForm((f) => ({ ...f, agency: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-900 transition-colors"
            placeholder="Nombre de tu agencia"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: saved ? '#16C79A' : '#0F3460' }}
        >
          {saving ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : saved ? (
            <><Check className="w-4 h-4" />¡Cambios guardados!</>
          ) : (
            <><Save className="w-4 h-4" />Guardar cambios</>
          )}
        </button>
      </form>

      {/* Plan info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <p className="text-xs font-medium text-gray-500 mb-1">Plan actual</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900 capitalize">{profile?.plan ?? 'trial'}</span>
          {profile?.plan === 'trial' && (
            <a href="#" className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white" style={{ background: '#E8A020' }}>
              Suscribirme
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
