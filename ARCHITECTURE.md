# Arquitectura del frontend

SPA con React 19, TypeScript, Vite y CSS Modules. Se organiza por features: cada dominio de negocio vive en su propia carpeta y lo reutilizable va en `shared/`.

## Estructura

```
src/
├── main.tsx              punto de entrada
├── app/                  arranque de la app: providers, rutas y guardas
│   ├── App.tsx           BrowserRouter + AuthProvider
│   ├── AppRoutes.tsx     tabla de rutas
│   ├── paths.ts          rutas de acceso y recuperación
│   ├── guards.tsx        RequireAuth y PublicOnly
│   ├── authRoutes.tsx    une cada pantalla de auth con la navegación
│   ├── ProtectedLayout.tsx, SectionPage.tsx
├── features/             un dominio por carpeta (auth, patients, agenda, ...)
│   └── auth/
│       ├── index.ts      API pública de la feature
│       ├── pages/        pantallas y sus estilos
│       ├── api.ts        llamadas al backend de esta feature
│       ├── session.ts    persistencia de la sesión
│       ├── AuthProvider.tsx, AuthContext.ts, useAuth.ts
│       └── types.ts
├── shared/               código sin dependencia de ninguna feature
│   ├── ui/               Button, TextField, Alert, FeaturedIcon
│   ├── layouts/          AuthLayout, AppLayout, Sidebar
│   ├── api/client.ts     cliente HTTP base y ApiError
│   └── styles/index.css  tokens del diseño y reset
└── assets/               íconos e imágenes
```

## Reglas

1. Una feature importa de `shared/`, nunca de otra feature. Si dos features necesitan lo mismo, ese código sube a `shared/`.
2. Fuera de una feature solo se importa lo que exporta su `index.ts`.
3. `shared/` no importa de `features/` ni de `app/`.
4. Cada componente va en su carpeta: `Nombre.tsx`, `Nombre.module.css` e `index.ts`.
5. Los imports que cruzan carpetas usan el alias `@/` (apunta a `src/`). Dentro de una misma carpeta se usan rutas relativas.
6. Los colores, radios y sombras salen de los tokens de `shared/styles/index.css`, que se toman del diseño de Figma. No se escriben valores sueltos.

## Rutas

React Router (modo declarativo, `BrowserRouter`). La app vive bajo `import.meta.env.BASE_URL` (`/odonto-dci-frontend/` en GitHub Pages), que se usa como `basename`.

| Ruta | Pantalla | Acceso |
|---|---|---|
| `/login` | Inicio de sesión | solo sin sesión |
| `/recuperar`, `/recuperar/revisa-tu-correo` | Pedir enlace, revisa tu correo | solo sin sesión |
| `/restablecer?token=` | Crear contraseña nueva | libre; sin token va a `/enlace-no-valido` |
| `/activar?token=` | Activar cuenta (invitación) | libre; sin token va a `/enlace-no-valido` |
| `/enlace-no-valido`, `/contrasena-actualizada` | Estados | libre |
| `/inicio`, `/agenda`, `/pacientes`, `/historia-clinica`, `/presupuestos`, `/caja`, `/reportes` | Secciones internas | requiere sesión |

- Sin sesión, una ruta interna redirige a `/login` y recuerda a dónde iba; tras iniciar sesión se vuelve ahí.
- Con sesión, `/login` y la recuperación redirigen a `/inicio`. Cualquier ruta desconocida también.
- Las rutas internas se definen una vez, en `NAV_ITEMS` (`shared/layouts/Sidebar/navItems.ts`). El sidebar y la tabla de rutas leen de ahí.
- Una pantalla de `features/` no navega por sí misma: recibe callbacks y `app/authRoutes.tsx` los conecta con el router.

**GitHub Pages:** no conoce las rutas de la SPA y respondería 404 al recargar `/pacientes`. El workflow de despliegue copia `index.html` a `404.html`, así Pages sirve la app también en ese caso (con estado 404, pero funciona). Si el hosting cambia, esto deja de hacer falta.

## Configuración

- La URL del backend sale de `VITE_API_URL`. Si no se define, se usa el backend desplegado. Hay un ejemplo en `.env.example`; los archivos `.env.local` no se versionan.
- El alias `@/` está en `tsconfig.app.json` y en `vite.config.ts`.

## Sesión de usuario

El backend devuelve un `accessToken` de 15 minutos y un `refreshToken` de 7 días, sin cookies.

- El access token vive solo en memoria. Nunca se guarda en disco.
- En `localStorage` (clave `dci.session`) se guarda lo mínimo para recuperar la sesión: refresh token, su vencimiento, correo y roles.
- Al abrir la app, si hay una sesión guardada vigente, se renueva con `POST /auth/refresh` antes de decidir qué pantalla mostrar. Si el backend responde que el token ya no sirve, se limpia y se muestra el login. Si no hay red, la sesión guardada se conserva.
- Mientras hay sesión, el access token se renueva solo, un minuto antes de que venza.
- Al salir se borra la sesión local y se avisa al backend con `POST /auth/logout`.

Riesgo conocido: un refresh token en `localStorage` es legible por cualquier script de la página, así que un XSS podría robarlo. Es el costo de no tener cookies `HttpOnly`. Si el backend pasa a emitirlas, la sesión debería migrar a ese esquema.

## Pendiente

- Validar el token de `/restablecer` y `/activar` con el backend. Hoy esas pantallas muestran datos de ejemplo.
- Pantallas reales para las secciones internas: hoy `SectionPage` solo muestra el título.
- Datos del servidor con TanStack Query y formularios con React Hook Form, cuando lleguen las primeras pantallas con datos.
- Tests con Vitest y Testing Library, y correrlos en el pipeline antes del build.
- Aplicar la regla 1 y la regla 2 con el linter.
