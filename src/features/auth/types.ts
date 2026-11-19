export type TokenResponse = {
  accessToken: string
  tokenType: string
  expiresIn: number
  refreshToken: string
  refreshExpiresIn: number
}

export type Session = {
  accessToken: string
  /** Epoch en ms. */
  accessExpiresAt: number
  refreshToken: string
  /** Epoch en ms. */
  refreshExpiresAt: number
  email: string
  roles: string[]
}

/** Lo que se guarda en localStorage. */
export type StoredSession = Pick<Session, 'refreshToken' | 'refreshExpiresAt' | 'email' | 'roles'>
