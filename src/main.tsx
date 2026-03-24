import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import App from './App.tsx'
import './index.css'

const NotFound = lazy(() => import('./components/NotFound'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="*" element={<Suspense fallback={null}><NotFound /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)
