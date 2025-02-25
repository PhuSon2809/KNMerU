import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// library css
import 'mingcute_icon/font/Mingcute.css'
import 'aos/dist/aos.css'
import './App.css'
import { setupAxiosClient, setupAxiosFormData } from './apis/axiosClient.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

setupAxiosClient()
setupAxiosFormData()
