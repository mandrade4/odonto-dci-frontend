import { LoginPage, type LoginNotice } from './features/auth/LoginPage'
import { useState } from 'react'

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

  if (loggedIn) return <h1>Logueados!</h1>;
  
  return <LoginPage notice={noticeFromQuery()} onSubmit={handleLogin}/>
}

export default App
