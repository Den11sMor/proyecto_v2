import './App.css'

function App() {
  return (
    <>
      <header>

        <div className="logo">

          <a href="index.html">
            Ferretería Los Maestros
          </a>

        </div>

        <nav>

          <a href="index.html">
            Inicio
          </a>

          <a href="pages/productos.html">
            Productos
          </a>

          <a href="pages/blogs.html">
            Blog
          </a>

          <a href="pages/nosotros.html">
            Nosotros
          </a>

          <a href="pages/contacto.html">
            Contacto
          </a>

          <a href="pages/login.html">
            Iniciar sesión
          </a>

          <a href="pages/carrito.html">
            Carrito
            <span id="contador-carrito">0</span>
          </a>

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
