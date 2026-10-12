import { Outlet } from 'react-router';
import Header from '../../components/common/Header';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <Navbar />

      {/* Aquí se renderiza la página pública seleccionada. */}
      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;