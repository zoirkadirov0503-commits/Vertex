import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MarketingLanding from './MarketingLanding.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MarketingLanding />
  </StrictMode>,
)
