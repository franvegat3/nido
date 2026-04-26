'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

type Props = {
  images: string[]
  title: string
}

export function GalleryViewer({ images, title }: Props) {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)
  const next = () => setCurrent((c) => (c + 1) % images.length)

  return (
    <>
      {/* Main gallery */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100" style={{ height: 280 }}>
        <img
          src={images[current]}
          alt={`${title} - foto ${current + 1}`}
          className="w-full h-full object-cover cursor-zoom-in"
          onClick={() => setLightbox(true)}
        />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white">
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs rounded-full px-2.5 py-1">
          {current + 1} / {images.length}
        </div>

        {/* Zoom icon */}
        <button
          onClick={() => setLightbox(true)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
        >
          <ZoomIn className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${i === current ? 'border-blue-900 opacity-100' : 'border-transparent opacity-60 hover:opacity-80'}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
            <X className="w-5 h-5" />
          </button>
          <img
            src={images[current]}
            alt={title}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          <div className="absolute bottom-4 text-white/60 text-sm">{current + 1} / {images.length}</div>
        </div>
      )}
    </>
  )
}
