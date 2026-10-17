import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user" transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}>
      <App />
    </MotionConfig>
  </StrictMode>,
)
