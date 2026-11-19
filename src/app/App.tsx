import { BrowserRouter } from 'react-router'
import { AuthProvider } from '@/features/auth'
import { AppRoutes } from './AppRoutes'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

function App() {
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
