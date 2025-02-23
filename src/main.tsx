import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// library css
import 'react-horizontal-scrolling-menu/dist/styles.css'
import 'mingcute_icon/font/Mingcute.css'
import 'aos/dist/aos.css'
import './App.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
