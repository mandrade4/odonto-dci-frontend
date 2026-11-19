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
