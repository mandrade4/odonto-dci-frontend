import house from '@/assets/icons/nav/house.svg'
import calendar from '@/assets/icons/nav/calendar.svg'
import users from '@/assets/icons/nav/users.svg'
import clipboard from '@/assets/icons/nav/clipboard.svg'
import receipt from '@/assets/icons/nav/receipt.svg'
import banknote from '@/assets/icons/nav/banknote.svg'
import chart from '@/assets/icons/nav/chart.svg'

export type NavKey =
  | 'inicio'
  | 'agenda'
  | 'pacientes'
  | 'historia-clinica'
  | 'presupuestos'
  | 'caja'
  | 'reportes'

export interface NavItem {
  key: NavKey
  label: string
  icon: string
  path: string
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'inicio', label: 'Inicio', icon : house, path: '/inicio' },
  { key: 'agenda', label: 'Agenda', icon : calendar, path: '/agenda' },
  { key: 'pacientes', label: 'Pacientes', icon : users, path: '/pacientes' },
  { key: 'historia-clinica', label: 'Historia clínica', icon : clipboard, path: '/historia-clinica' },
  { key: 'presupuestos', label: 'Presupuestos', icon : receipt, path: '/presupuestos' },
  { key: 'caja', label: 'Caja', icon : banknote, path: '/caja' },
  { key: 'reportes', label: 'Reportes', icon : chart, path: '/reportes' },
  
]