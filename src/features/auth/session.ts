import type { Session, StoredSession } from './types'

const STORAGE_KEY = 'dci.session'

// localStorage puede fallar (modo privado): la app debe seguir funcionando.

export function loadStoredSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const stored = JSON.parse(raw) as StoredSession
    if (!stored.refreshToken || stored.refreshExpiresAt <= Date.now()) {
      clearStoredSession()
      return null
    }
    return stored
  } catch {
    return null
  }
}

// El access token no se guarda: queda en memoria.
export function saveStoredSession(session: Session): void {
  const stored: StoredSession = {
    refreshToken: session.refreshToken,
    refreshExpiresAt: session.refreshExpiresAt,
    email: session.email,
    roles: session.roles,
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  } catch {
    // Sin almacenamiento, la sesión dura lo que la pestaña.
  }
}

export function clearStoredSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // sin almacenamiento
  }
}
