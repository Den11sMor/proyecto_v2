import { Link } from 'react-router'

// Artículos disponibles en el blog.
const articulos = [
  {
    id: 1,
    titulo: 'Herramientas esenciales para tener en casa',
    imagen: '/img/blog/herramientas_img.jpg',
    resumen:
      'Conoce las herramientas básicas para realizar reparaciones en tu hogar.',
  },
  {
    id: 2,
    titulo: 'Consejos para mejorar y cuidar tu hogar',
    imagen: '/img/blog/hogar_img.jpg',
    resumen:
      'Ideas simples para mantener tu hogar en buenas condiciones.',
  },
]

function Blogs() {
  return (
    <main className="pagina-blogs">
      <h1 className="titulo-pagina">Blog</h1>

      {/* Lista de artículos disponibles. */}
      <section id="lista-blogs" className="blogs-grid">
        {articulos.map((articulo) => (
          <article className="blog-card" key={articulo.id}>
            <img
              src={articulo.imagen}
              alt={articulo.titulo}
              loading="lazy"
            />

            <h2>{articulo.titulo}</h2>

            <p>{articulo.resumen}</p>

            <Link to={`/blog/${articulo.id}`}>
              Ver artículo
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Blogs