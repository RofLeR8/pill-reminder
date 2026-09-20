import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ToastContainer } from './components/Toast/ToastContainer'
import { MedicinesProvider } from './contexts/MedicinesContext'
import { IntakesProvider } from './contexts/IntakesContext'
import { SettingsProvider } from './contexts/SettingsContext'
import { ToastProvider } from './contexts/ToastContext'
import './styles/global.css'

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <SettingsProvider>
          <MedicinesProvider>
            <IntakesProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  {/* TODO: Добавить остальные маршруты */}
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
              <ToastContainer />
            </IntakesProvider>
          </MedicinesProvider>
        </SettingsProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
