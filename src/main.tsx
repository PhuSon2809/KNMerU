import { GoogleOAuthProvider } from '@react-oauth/google'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { setupAxiosClient, setupAxiosFormData } from './apis/axiosClient.ts'
import store from './store/configStore.ts'
import App from './App.tsx'
import 'aos/dist/aos.css'
import 'mingcute_icon/font/Mingcute.css'
import './App.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId='986748797393-76f858ctcf17qagonj9oomiljtf1edh4.apps.googleusercontent.com'>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
)

setupAxiosClient()
setupAxiosFormData()
