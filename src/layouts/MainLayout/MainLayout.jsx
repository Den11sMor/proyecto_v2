import { Outlet } from 'react-router'
import Header from '../../components/common/Header'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'

// Estructura compartida de las páginas públicas.
function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <Navbar />

      {/* Contenido de la página seleccionada. */}
      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout
