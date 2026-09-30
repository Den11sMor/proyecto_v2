import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import './index.css'

import Inicio from './pages/inicio.jsx'
import Contacto from './pages/contacto.jsx'
import Nosotros from './pages/nosotros.jsx'
import Productos from './pages/productos.jsx'
import Carrito from './pages/carrito.jsx'
import Login from './pages/login.jsx'
import Registro from './pages/registro.jsx'
import Blogs from './pages/blogs.jsx'
import DetalleProducto from './pages/producto.detalle.jsx'
import BlogDetalles from './pages/blog-detalles.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/blog/:id" element={<BlogDetalles />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)