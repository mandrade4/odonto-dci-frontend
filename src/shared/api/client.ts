const DEFAULT_API_URL = 'https://odonto-dci-backend-u4d3zq4fpa-uc.a.run.app/api/v1'

export const API_URL: string = import.meta.env.VITE_API_URL ?? DEFAULT_API_URL

/** `status` es 0 si no hubo respuesta (red caída, CORS). */
export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type RequestOptions = {
  body?: unknown
  token?: string
}

async function request<T>(method: string, path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {}
  if (options.body !== undefined) headers['Content-Type'] = 'application/json'
  if (options.token) headers.Authorization = `Bearer ${options.token}`

  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    })
  } catch {
    throw new ApiError(0, 'No se pudo conectar con el servidor')
  }

  if (!response.ok) {
    // Errores en `detail` (RFC 7807).
    const problem = await response.json().catch(() => null)
    throw new ApiError(response.status, problem?.detail ?? response.statusText)
  }
  if (response.status === 204) return undefined as T
  return (await response.json()) as T
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) => request<T>('GET', path, options),
  post: <T>(path: string, options?: RequestOptions) => request<T>('POST', path, options),
}
