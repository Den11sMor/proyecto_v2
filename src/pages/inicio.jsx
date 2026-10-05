import { Link } from 'react-router'

const productosDestacados = [
  {
    id: 1,
    nombre: 'Cinta',
    imagen:
      '/img/productos/cinta_img.jpg',
  },
  {
    id: 2,
    nombre: 'Destornillador',
    imagen:
      '/img/productos/destornillador_img.jpg',
  },
  {
    id: 3,
    nombre: 'Martillo',
    imagen:
      '/img/productos/martillo_img.jpg',
  },
  {
    id: 4,
    nombre: 'Taladro',
    imagen:
      '/img/productos/taladro_img.jpg',
  },
  {
    id: 5,
    nombre: 'Tornillos',
    imagen:
      '/img/productos/tornillos_img.jpg',
  },
]

function Inicio() {
  return (
    <>
      <header>
        <div className="logo">
          <Link to="/">
            Ferretería Los Maestros
          </Link>
        </div>

        <nav>
          <Link to="/">
            Inicio
          </Link>

          <Link to="/productos">
            Productos
          </Link>

          <Link to="/blogs">
            Blog
          </Link>

          <Link to="/nosotros">
            Nosotros
          </Link>

          <Link to="/contacto">
            Contacto
          </Link>

          <Link to="/login">
            Iniciar sesión
          </Link>

          <Link to="/carrito">
            Carrito
          </Link>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>
            Ferretería Los Maestros
          </h1>

          <p>
            Herramientas y productos
            para tus proyectos.
          </p>

          <Link
            className="btn"
            to="/productos"
          >
            Ver productos
          </Link>
        </section>

        <section className="productos-destacados">
          <h2>
            Productos destacados
          </h2>

          <div className="productos-grid">

            {productosDestacados.map(
              (producto) => (
                <article
                  className="producto-card"
                  key={producto.id}
                >
                  <img
                    src={
                      producto.imagen
                    }
                    alt={
                      producto.nombre
                    }
                  />

                  <h3>
                    {
                      producto.nombre
                    }
                  </h3>

                  <Link
                    to={`/producto/${producto.id}`}
                  >
                    Ver detalle
                  </Link>
                </article>
              )
            )}

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