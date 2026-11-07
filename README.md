# DentalCare · Frontend

Aplicación web del proyecto de odontología, construida con React 19, TypeScript y Vite.

## Requisitos

- Node.js 20.19 o superior (o 22.12+)
- npm 10 o superior
- Git

## Clonar el repositorio

```bash
git clone git@github.com:kuroxbyte/odonto-dci-frontend.git
cd odonto-dci-frontend
```

Si no tienes configurada una llave SSH, puedes clonar por HTTPS:

```bash
git clone https://github.com/kuroxbyte/odonto-dci-frontend.git
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar en local

```bash
npm run dev
```

La aplicación queda disponible en http://localhost:5173.

La pantalla de inicio de sesión permite previsualizar sus variantes con el parámetro `estado`:

- http://localhost:5173/?estado=error — error de acceso
- http://localhost:5173/?estado=bloqueada — cuenta bloqueada
- http://localhost:5173/?estado=inactividad — sesión cerrada por inactividad

El formulario todavía no está conectado a un servicio de autenticación.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo con recarga en caliente |
| `npm run build` | Verifica los tipos y genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la versión generada por `build` |
| `npm run lint` | Ejecuta Oxlint sobre el código |

## Estructura

```
src/
├── assets/icons/     Íconos SVG exportados de Figma
├── components/       Componentes base (AuthLayout, TextField, Button, Alert)
├── features/auth/    Pantallas de autenticación (LoginPage)
├── App.tsx
└── index.css         Tokens de diseño como variables CSS
```

## Convención de ramas y commits

Las ramas y los commits llevan el código del ticket, por ejemplo `feature/DCI-5-login` y `feature(DCI-5): implementa pantalla de inicio de sesión`.
