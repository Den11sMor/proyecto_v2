function Productos() {
  return (
    <>
      <header>
        <div className="logo">
          <a href="/">Ferretería Los Maestros</a>
        </div>

        <nav>
          <a href="/">Inicio</a>
          <a href="/productos">Productos</a>
          <a href="/blogs">Blog</a>
          <a href="/nosotros">Nosotros</a>
          <a href="/contacto">Contacto</a>
          <a href="/login">Iniciar sesión</a>

          <a href="/carrito">
            Carrito
            <span id="contador-carrito">0</span>
          </a>
        </nav>
      </header>

      <main>
        <section>
          <h1>Productos</h1>

          <div className="buscador">
            <input
              type="text"
              id="buscar-producto"
              placeholder="Buscar producto..."
            />

            <button type="button">
              Buscar
            </button>
          </div>

          <section
            id="lista-productos"
            className="productos-grid"
          >
            <img
              src="/img/productos/cinta_img.jpg"
              alt="Cinta"
            />

            <img
              src="/img/productos/destornillador_img.jpg"
              alt="Destornillador"
            />

            <img
              src="/img/productos/martillo_img.jpg"
              alt="Martillo"
            />

            <img
              src="/img/productos/taladro_img.jpg"
              alt="Taladro"
            />

            <img
              src="/img/productos/tornillos_img.jpg"
              alt="Tornillos"
            />
          </section>
        </section>
      </main>
    </>
  )
}

export default Productos