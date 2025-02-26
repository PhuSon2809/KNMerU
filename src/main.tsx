import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// library css
import 'mingcute_icon/font/Mingcute.css'
import 'aos/dist/aos.css'
import './App.css'
import { setupAxiosClient, setupAxiosFormData } from './apis/axiosClient.ts'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './store/configStore.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="986748797393-76f858ctcf17qagonj9oomiljtf1edh4.apps.googleusercontent.com">  {/* Thêm Google Client ID ở đây */}
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
)

setupAxiosClient()
setupAxiosFormData()
