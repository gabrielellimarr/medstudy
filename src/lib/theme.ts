export type Tema = 'claro' | 'escuro' | 'auto'

const CHAVE = 'medstudy:preferencias'

export interface Preferencias { tema: Tema; corPrincipal: string }
export const padrao: Preferencias = { tema: 'auto', corPrincipal: '#0f766e' }

export function hexParaRgb(hex: string): string {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16)
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
}

export function aplicar(p: Preferencias) {
  const escuro = p.tema === 'escuro' || (p.tema === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches)
  const r = document.documentElement
  r.dataset.theme = escuro ? 'dark' : 'light'
  r.style.setProperty('--brand', hexParaRgb(p.corPrincipal))
}

export function carregar(): Preferencias {
  try { return { ...padrao, ...JSON.parse(localStorage.getItem(CHAVE) ?? '{}') } } catch { return padrao }
}
export function salvar(p: Preferencias) { localStorage.setItem(CHAVE, JSON.stringify(p)) }
