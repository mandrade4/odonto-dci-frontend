import { api } from '@/shared/api/client'
import type { Session, TokenResponse } from './types'

// Solo para mostrar datos; el backend verifica el token.
function rolesFromToken(accessToken: string): string[] {
  try {
    const payload = accessToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const claims = JSON.parse(atob(payload))
    return Array.isArray(claims.roles) ? claims.roles : []
  } catch {
    return []
  }
}

function toSession(tokens: TokenResponse, email: string): Session {
  const now = Date.now()
  return {
    accessToken: tokens.accessToken,
    accessExpiresAt: now + tokens.expiresIn * 1000,
    refreshToken: tokens.refreshToken,
    refreshExpiresAt: now + tokens.refreshExpiresIn * 1000,
    email,
    roles: rolesFromToken(tokens.accessToken),
  }
}

// El backend llama `username` al correo.
export async function login(email: string, password: string): Promise<Session> {
  const tokens = await api.post<TokenResponse>('/auth/login', {
    body: { username: email, password },
  })
  return toSession(tokens, email)
}

export async function refresh(refreshToken: string, email: string): Promise<Session> {
  const tokens = await api.post<TokenResponse>('/auth/refresh', { body: { refreshToken } })
  return toSession(tokens, email)
}

export async function logout(refreshToken: string): Promise<void> {
  await api.post<void>('/auth/logout', { body: { refreshToken } })
}
