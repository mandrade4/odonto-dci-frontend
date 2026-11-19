import { NAV_ITEMS } from '@/shared/layouts/Sidebar'
import { useLocation } from 'react-router'

export function SectionPage() {
  const { pathname } = useLocation()
  const item = NAV_ITEMS.find((candidate) => candidate.path === pathname)
  return <h1>{item?.label}</h1>
}
