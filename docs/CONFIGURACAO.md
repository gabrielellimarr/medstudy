# Configuração local

1. Instale Node.js 20+ e Git.
2. `npm install`
3. Crie um projeto em https://supabase.com e copie **Project URL** e **anon key**
   (Settings > API) para `.env.local` (modelo em `.env.example`).
4. No Supabase, abra **SQL Editor** e execute `supabase/migrations/0001_base.sql`.
5. `npm run dev` e abra http://localhost:5173
