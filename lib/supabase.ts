import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

// Browser/client-side client (uses publishable key)
export const supabase = createClient(supabaseUrl, supabasePublishableKey)

// Types
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
      properties: {
        Row: PropertyRow
        Insert: Omit<PropertyRow, 'id' | 'created_at' | 'views'>
        Update: Partial<Omit<PropertyRow, 'id' | 'created_at'>>
      }
      leads: {
        Row: Lead
        Insert: Omit<Lead, 'id' | 'created_at'>
        Update: Partial<Omit<Lead, 'id' | 'created_at'>>
      }
    }
  }
}

export type Profile = {
  id: string
  email: string
  name: string
  phone: string
  agency: string | null
  photo: string | null
  plan: 'trial' | 'starter' | 'pro' | 'team'
  trial_ends: string
  created_at: string
}

export type PropertyRow = {
  id: string
  owner_id: string
  title: string
  description: string
  type: string
  operation: 'Venta' | 'Renta'
  price: number
  area: number
  bedrooms: number | null
  bathrooms: number | null
  parking: number | null
  address: string
  colonia: string
  city: string
  state: string
  lat: number | null
  lng: number | null
  amenities: string[]
  images: string[]
  views: number
  active: boolean
  created_at: string
}

export type Lead = {
  id: string
  property_id: string
  advisor_id: string
  name: string
  email: string | null
  phone: string
  message: string | null
  source: 'whatsapp' | 'form' | 'call'
  created_at: string
}
