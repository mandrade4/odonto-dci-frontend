import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ApiError } from '@/shared/api/client'
import * as authApi from './api'
import { AuthContext, type AuthContextValue, type AuthStatus } from './AuthContext'
import { clearStoredSession, loadStoredSession, saveStoredSession } from './session'
import type { Session } from './types'

// Se renueva un minuto antes de que venza.
const REFRESH_MARGIN_MS = 60_000

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<AuthStatus>(() =>
    loadStoredSession() ? 'loading' : 'anonymous',
  )
  // Evita renovar dos veces (StrictMode monta dos veces).
  const refreshInFlight = useRef<Promise<Session> | null>(null)

  const startSession = useCallback((next: Session) => {
    saveStoredSession(next)
    setSession(next)
    setStatus('authenticated')
  }, [])

  const endSession = useCallback(() => {
    clearStoredSession()
    setSession(null)
    setStatus('anonymous')
  }, [])

  const renew = useCallback(
    (refreshToken: string, email: string) => {
      refreshInFlight.current ??= authApi
        .refresh(refreshToken, email)
        .finally(() => {
          refreshInFlight.current = null
        })
      return refreshInFlight.current
    },
    [],
  )

  useEffect(() => {
    const stored = loadStoredSession()
    if (!stored) return
    let cancelled = false
    renew(stored.refreshToken, stored.email)
      .then((next) => {
        if (!cancelled) startSession(next)
      })
      .catch((error) => {
        if (cancelled) return
        // Solo una respuesta del backend invalida la sesión; sin red se conserva.
        if (error instanceof ApiError && error.status !== 0) clearStoredSession()
        setStatus('anonymous')
      })
    return () => {
      cancelled = true
    }
  }, [renew, startSession])

  useEffect(() => {
    if (!session) return
    const delay = Math.max(session.accessExpiresAt - Date.now() - REFRESH_MARGIN_MS, 0)
    const timer = window.setTimeout(() => {
      renew(session.refreshToken, session.email).then(startSession, endSession)
    }, delay)
    return () => window.clearTimeout(timer)
  }, [session, renew, startSession, endSession])

  const login = useCallback(
    async (email: string, password: string) => {
      startSession(await authApi.login(email, password))
    },
    [startSession],
  )

  const logout = useCallback(async () => {
    const current = session
    endSession()
    // Aviso al backend: mejor esfuerzo.
    if (current) await authApi.logout(current.refreshToken).catch(() => {})
  }, [session, endSession])

  const value = useMemo<AuthContextValue>(
    () => ({ status, session, login, logout }),
    [status, session, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
