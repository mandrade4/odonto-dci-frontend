import { LoginPage, type LoginNotice } from './features/auth/LoginPage'
import { useState } from 'react'
import { AppLayout } from './components/AppLayout/AppLayout'
import type { NavKey } from './components/Sidebar/navItems'

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

  const [loggedIn, setLoggedIn] = useState(false);
  
  const [section, setSection] = useState<NavKey>('inicio');

  async function handleLogin(datos: { email: string; password: string }){
    const response = await fetch(
      'https://odonto-dci-backend-u4d3zq4fpa-uc.a.run.app/api/v1/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: datos.email, password: datos.password}),
      }
    );
    if (response.ok) setLoggedIn(true);
  }
  
  const showLayoutPreview =
    import.meta.env.DEV &&
    new URLSearchParams(window.location.search).get('vista') === 'layout'

  if (showLayoutPreview || loggedIn)
    return <AppLayout activeKey={section} onNavigate={setSection} />

  if (loggedIn) return <AppLayout activeKey={section} onNavigate={setSection}/>;
  
  return <LoginPage notice={noticeFromQuery()} onSubmit={handleLogin}/>
}

export default App
