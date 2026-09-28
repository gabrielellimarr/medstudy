import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabaseConfigurado = Boolean(url && anon)

// Só a chave "anon" (pública) vai no frontend. A segurança real vem das políticas RLS.
export const supabase = supabaseConfigurado ? createClient(url!, anon!) : null
