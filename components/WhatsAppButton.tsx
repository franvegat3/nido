'use client'

import { MessageCircle } from 'lucide-react'
import { formatWhatsApp } from '@/lib/utils'
import { cn } from '@/lib/utils'

type Props = {
  phone: string
  message: string
  className?: string
}

export function WhatsAppButton({ phone, message, className }: Props) {
  const href = formatWhatsApp(phone, message)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90',
        className
      )}
      style={{ background: '#25D366' }}
    >
      <MessageCircle className="w-4 h-4" />
      WhatsApp
    </a>
  )
}
