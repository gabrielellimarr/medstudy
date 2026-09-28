# Arquitetura

- **Frontend:** React + TypeScript + Vite + Tailwind CSS (tokens via variáveis CSS).
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Edge Functions).
- **Segurança:** RLS em todas as tabelas; chave `service_role` e segredos do Google só em Edge Functions.
- **Rotas:** React Router. Páginas em `src/pages`, lógica compartilhada em `src/lib`.
- **Tema:** `src/lib/theme.ts` aplica tema e cor principal via `data-theme` e `--brand`.

## Serviços externos a configurar
1. Conta no GitHub (repositório).
2. Projeto no Supabase (URL e anon key).
3. Google Cloud Console (OAuth) para login Google e Drive, na Etapa 6.
4. Hospedagem (Vercel, Netlify ou Cloudflare Pages), na Etapa 11.

## Etapas
Seguem as 11 etapas de `docs/PROJETO.md`. Etapa 1 = este esqueleto.
