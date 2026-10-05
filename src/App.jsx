import { useState } from 'react'
import './App.css'

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

function App() {

  cosnt [pagina, setPagina] = useState('inicio')

  const mostrarPagina = () => {
    switch (pagina){

      case "productos":
        return <Productos />
      case "productoDetalle":
        return <ProductoDetalle />
      case "carrito":
        return <Carrito />
      case "blogs":
        return <Blogs />
      case "blogDetalles":
        return <BlogDetalles />
      case "contacto":
        return <Contacto />
      case "nosotros":
        return <Nosotros />
      case "login":
        return <Login />
      case "registro":
        return <Registro />
      default:
        return <Inicio />
    }
  }

  return (
    <>
      <header>

        <div className="logo">

          <a href="index.html">
            Ferretería Los Maestros
          </a>

          <button 
            type="button"
            onClick={() => setPagina('Inicio')}
          >
            Inicio
          </button>

        </div>

        <nav>

          <button 
            type="button"
            onClick={() => setPagina('Inicio')}
          >
            Inicio
          </button>
          
          <button 
            type="button"
            onClick={() => setPagina('Productos')}
          >
            Productos
          </button>

          <button 
            type="button"
            onClick={() => setPagina('Blogs')}
          >
            Blogs
          </button>

          <button 
            type="button"
            onClick={() => setPagina('Nosotros')}
          >
            Nosotros
          </button>

          <button 
            type="button"
            onClick={() => setPagina('Contacto')}
          >
            Contacto
          </button>

          <button 
            type="button"
            onClick={() => setPagina('Login')}
          >
            Iniciar sesión
          </button>

          <button 
            type="button"
            onClick={() => setPagina('Carrito')}
          >
            Carrito
            <span id="contador-carrito">0</span>
          </button>

        </nav>

      </header>

      <main>

        <section className="hero">

          <h1>
            Ferretería Los Maestros
          </h1>

          <p>
            Herramientas y productos para tus proyectos.
          </p>

          <a
            className="btn"
            href="pages/productos.html">
            Ver productos
          </a>

        </section>

        <section>

          <h2>
            Productos destacados
          </h2>

          <section
            id="lista-productos"
            className="productos-grid">
          </section>

        </section>

      </main>

      <footer>

        <p>
          © 2026 Ferretería Los Maestros
        </p>

      </footer>
    </>

  )
}

export default App
