import { Route, Routes } from 'react-router-dom'
import { ContactPage } from '@/pages/ContactPage.jsx'
import { DatenschutzPage } from '@/pages/DatenschutzPage.jsx'
import { HomePage } from '@/pages/HomePage.jsx'
import { ImpressumPage } from '@/pages/ImpressumPage.jsx'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/datenschutz" element={<DatenschutzPage />} />
      <Route path="/impressum" element={<ImpressumPage />} />
    </Routes>
  )
}
