import './index.css'

import MainEntry from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('guantanamobay')).render(
  <StrictMode>
    <MainEntry />
 </StrictMode>
)

