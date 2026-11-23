import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { NAV_ITEMS } from '@/shared/layouts/Sidebar'
import { APP_NAME, PAGE_TITLES } from './paths'

/** Pone el título de la pestaña según la ruta: "Caja · DentaPerú". */
export function useTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    const title =
      PAGE_TITLES[pathname] ?? NAV_ITEMS.find((item) => item.path === pathname)?.label
    document.title = title ? `${title} · ${APP_NAME}` : APP_NAME
  }, [pathname])
}
