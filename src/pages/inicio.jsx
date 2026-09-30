function Inicio() {
  return (
    <>
      <header>

        <div className="logo">

          <a href="index.html">
            Ferretería Los Maestros
          </a>

        </div>

        <nav>

          <a href="/">
            Inicio
          </a>

          <a href="/productos">
            Productos
          </a>

          <a href="/blogs">
            Blog
          </a>

          <a href="/nosotros">
            Nosotros
          </a>

          <a href="/contacto">
            Contacto
          </a>

          <a href="/login">
            Iniciar sesión
          </a>

          <a href="/carrito">
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
            href="/productos">
            Ver productos
          </a>

        </section>

        <section className="productos-destacados">
          <h2>Productos destacados</h2>

          <div className="productos-grid">

            <div className="producto-card">
              <img
                src="/img/productos/cinta_img.jpg"
                alt="Cinta"
              />
              <h3>Cinta</h3>
              <a href="/producto/1">
                Ver detalle
              </a>
            </div>

            <div className="producto-card">
              <img
                src="/img/productos/destornillador_img.jpg"
                alt="Destornillador"
              />
              <h3>Destornillador</h3>
              <a href="/producto/2">
                Ver detalle
              </a>
            </div>

            <div className="producto-card">
              <img
                src="/img/productos/martillo_img.jpg"
                alt="Martillo"
              />
              <h3>Martillo</h3>
              <a href="/producto/3">
                Ver detalle
              </a>
            </div>

            <div className="producto-card">
              <img
                src="/img/productos/taladro_img.jpg"
                alt="Taladro"
              />
              <h3>Taladro</h3>
              <a href="/producto/4">
                Ver detalle
              </a>
            </div>

            <div className="producto-card">
              <img
                src="/img/productos/tornillos_img.jpg"
                alt="Tornillos"
              />
              <h3>Tornillos</h3>
              <a href="/producto/5">
                Ver detalle
              </a>
            </div>

          </div>
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
export default Inicio
