export const PATHS = {
  home: '/inicio',
  login: '/login',
  recover: '/recuperar',
  checkEmail: '/recuperar/revisa-tu-correo',
  reset: '/restablecer', // llega por correo: /restablecer?token=...
  activate: '/activar', // llega por correo: /activar?token=...
  invalidLink: '/enlace-no-valido',
  passwordUpdated: '/contrasena-actualizada',
} as const

export const APP_NAME = 'DentaPerú'

export const PAGE_TITLES: Record<string, string> = {
  [PATHS.login]: 'Iniciar sesión',
  [PATHS.recover]: 'Recuperar contraseña',
  [PATHS.checkEmail]: 'Revisa tu correo',
  [PATHS.reset]: 'Crear contraseña',
  [PATHS.activate]: 'Activar cuenta',
  [PATHS.invalidLink]: 'Enlace no válido',
  [PATHS.passwordUpdated]: 'Contraseña actualizada',
}
