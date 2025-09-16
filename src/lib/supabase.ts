import { createClient } from '@supabase/supabase-js'

// Estas URLs las obtendremos de Supabase cuando crees el proyecto
const supabaseUrl = 'https://yeexjjmfszxicdpbvhry.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllZXhqam1mc3p4aWNkcGJ2aHJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczODI0MjEsImV4cCI6MjA3Mjk1ODQyMX0.35p2CkJLIxEJMEuyem5hSJjaw-_tDWR9En4RsRpa6P8'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos de datos para TypeScript
export interface Product {
  id: number
  name: string
  price: number
  category: string
  image_url: string
  is_new: boolean
  description: string
  created_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
  icon: string
}
