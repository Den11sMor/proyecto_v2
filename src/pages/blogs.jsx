import { Link } from 'react-router'

const articulos = [
  {
    id: 1,
    titulo:
      'Herramientas esenciales para tener en casa',
    imagen:
      '/img/blog/herramientas_img.jpg',
    resumen:
      'Conoce las herramientas básicas para realizar reparaciones en tu hogar.',
  },
  {
    id: 2,
    titulo:
      'Consejos para mejorar y cuidar tu hogar',
    imagen:
      '/img/blog/hogar_img.jpg',
    resumen:
      'Ideas simples para mantener tu hogar en buenas condiciones.',
  },
]

function Blogs() {
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

          <Link to="/carrito">
            Carrito
          </Link>
        </nav>
      </header>

      <main>

        <h1>Blog</h1>

        <section
          id="lista-blogs"
          className="blogs-grid"
        >

          {articulos.map(
            (articulo) => (
              <article
                className="blog-card"
                key={articulo.id}
              >
                <img
                  src={
                    articulo.imagen
                  }
                  alt={
                    articulo.titulo
                  }
                />

                <h2>
                  {
                    articulo.titulo
                  }
                </h2>

                <p>
                  {
                    articulo.resumen
                  }
                </p>

                <Link
                  to={`/blog/${articulo.id}`}
                >
                  Ver artículo
                </Link>
              </article>
            )
          )}

        </section>
      </main>
    </>
  )
}

export default Blogs