// src/lib/supabaseClient.ts

import { ensureStackblitzEnv } from './stackblitzEnv'
ensureStackblitzEnv()

import { createClient } from '@supabase/supabase-js'

// Use Netlify envs in production; fall back to localStorage in StackBlitz
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ?? localStorage.getItem('VITE_SUPABASE_URL')
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? localStorage.getItem('VITE_SUPABASE_ANON_KEY')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase URL or key missing — check stackblitzEnv.ts setup.')
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)
