import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import UploadPage from './pages/UploadPage'
import GalleryPage from './pages/GalleryPage'
import AdminPage from './pages/AdminPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<UploadPage />} />
          <Route path="gallery" element={<GalleryPage />} />
        </Route>
        
        {/* Admin route without MainLayout */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  )
}

export default App

