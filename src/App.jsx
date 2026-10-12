import { Navigate, Route, Routes } from 'react-router'
import './App.css'

// Layouts principales.
import MainLayout from './layouts/MainLayout/MainLayout'
import AdminLayout from './layouts/AdminLayout/AdminLayout'

// Páginas públicas.
import Inicio from './pages/inicio'
import Productos from './pages/productos'
import ProductoDetalle from './pages/producto.detalle'
import Carrito from './pages/carrito'
import Blogs from './pages/blogs'
import BlogDetalles from './pages/blog-detalles'
import Contacto from './pages/contacto'
import Nosotros from './pages/nosotros'
import Login from './pages/login'
import Registro from './pages/registro'

// Páginas de administración.
import Admin from './pages/admin/admin'
import ProductosAdmin from './pages/admin/productos-admin'
import ProductoForm from './pages/admin/producto-form'
import UsuariosAdmin from './pages/admin/usuarios-admin'
import UsuarioForm from './pages/admin/usuario-form'

function App() {
  return (
    <Routes>
      {/* Páginas que comparten el encabezado y el pie de página. */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetalles />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<Nosotros />} />
      </Route>

      {/* Acceso y registro de usuarios. */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* Panel administrativo y sus páginas internas. */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Admin />} />
        <Route path="productos" element={<ProductosAdmin />} />
        <Route path="productos/nuevo" element={<ProductoForm />} />
        <Route path="usuarios" element={<UsuariosAdmin />} />
        <Route path="usuarios/nuevo" element={<UsuarioForm />} />
      </Route>

      {/* Redirige las rutas inexistentes al inicio. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
