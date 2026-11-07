import { LoginPage, type LoginNotice } from './features/auth/LoginPage'

// Vista previa de las variantes del diseño: /?estado=error|bloqueada|inactividad
function noticeFromQuery(): LoginNotice | undefined {
  switch (new URLSearchParams(window.location.search).get('estado')) {
    case 'error':
      return { type: 'error', attemptsLeft: 2 }
    case 'bloqueada':
      return { type: 'locked' }
    case 'inactividad':
      return { type: 'inactive' }
    default:
      return undefined
  }
}

function App() {
  // TODO(DCI-5): conectar con el servicio de autenticación cuando exista.
  return <LoginPage notice={noticeFromQuery()} />
}

export default App
