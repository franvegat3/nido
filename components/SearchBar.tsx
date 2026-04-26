'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'

export function SearchBar({ className }: { className?: string }) {
  const [keyword, setKeyword] = useState('')
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (keyword.trim()) params.set('q', keyword.trim())
    router.push(`/propiedades?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className={`flex gap-2 max-w-xl mx-auto ${className ?? ''}`}>
      <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-lg">
        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Ciudad, colonia, tipo... ej: Casa en Providencia"
          className="flex-1 text-gray-900 text-sm bg-transparent outline-none placeholder:text-gray-400"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="px-5 py-3 rounded-xl font-semibold text-white text-sm flex items-center gap-2 transition-opacity hover:opacity-90 shadow-lg"
        style={{ background: '#E8A020' }}
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Buscar</span>
      </button>
    </form>
  )
}
