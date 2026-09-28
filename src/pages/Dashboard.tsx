import { supabaseConfigurado } from '@/lib/supabase'

export default function Dashboard() {
  const data = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(new Date())
  return (
    <>
      <h1 className="font-serif text-3xl font-semibold">Olá!</h1>
      <p className="text-muted mt-1 first-letter:uppercase">{data}</p>

      {!supabaseConfigurado && (
        <div className="mt-6 rounded-lg border border-line bg-surface p-4 text-sm">
          O Supabase ainda não está configurado. Copie <code>.env.example</code> para{' '}
          <code>.env.local</code> e preencha as chaves (veja <code>docs/CONFIGURACAO.md</code>).
        </div>
      )}

      <div className="mt-6 rounded-lg border border-dashed border-line p-8 text-center text-muted">
        Você ainda não registrou estudos. Comece importando questões ou criando seu primeiro cronograma.
      </div>
    </>
  )
}
