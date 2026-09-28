import { NavLink, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import EmBreve from './pages/EmBreve'

const menu = [
  ['/', 'Dashboard'],
  ['/disciplinas', 'Disciplinas'],
  ['/questoes', 'Questões'],
  ['/flashcards', 'Flashcards'],
  ['/materiais', 'Meus materiais'],
  ['/cronograma', 'Cronograma'],
  ['/residencia', 'Residência Médica'],
  ['/desempenho', 'Desempenho'],
  ['/configuracoes', 'Configurações'],
] as const

export default function App() {
  return (
    <div className="min-h-screen md:flex">
      <nav className="md:w-60 md:min-h-screen border-b md:border-b-0 md:border-r border-line bg-surface p-4">
        <p className="font-serif text-xl font-semibold mb-4">{import.meta.env.VITE_APP_NAME ?? 'MedStudy'}</p>
        <ul className="flex md:flex-col gap-1 overflow-x-auto">
          {menu.map(([to, nome]) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `block whitespace-nowrap rounded-md px-3 py-2 text-sm ${
                    isActive ? 'bg-brand text-brand-ink' : 'text-muted hover:text-ink'
                  }`
                }
              >
                {nome}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 p-6 max-w-5xl">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<EmBreve />} />
        </Routes>
      </main>
    </div>
  )
}
