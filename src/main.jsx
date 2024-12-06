import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AppProvider, AppContext } from "./contexts/AppContext.jsx";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <App />
  </StrictMode>
)
