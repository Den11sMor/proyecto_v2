import { Link, useParams } from 'react-router'

// Contenido de los artículos.
const articulos = {
  1: {
    titulo: 'Herramientas esenciales para tener en casa',
    imagen: '/img/blog/herramientas_img.jpg',
    contenido: [
      'Contar con herramientas básicas permite resolver pequeñas reparaciones en el hogar.',
      'Un martillo, destornilladores, cinta métrica y alicates forman un buen kit inicial.',
      'También es importante mantener las herramientas limpias y ordenadas.',
    ],
  },
  2: {
    titulo: 'Consejos para mejorar y cuidar tu hogar',
    imagen: '/img/blog/hogar_img.jpg',
    contenido: [
      'La mantención preventiva permite evitar reparaciones más costosas.',
      'Es recomendable revisar filtraciones, ventanas, tornillos y enchufes periódicamente.',
      'Antes de realizar una reparación utiliza siempre los elementos de protección necesarios.',
    ],
  },
}

function BlogDetalles() {
  const { id } = useParams()
  const articulo = articulos[id]

  return (
    <main className="pagina-blog-detalle">
      {!articulo ? (
        <section className="formulario-container">
          <h1>Artículo no encontrado</h1>

          <Link className="btn" to="/blogs">
            Volver al blog
          </Link>
        </section>
      ) : (
        <article className="blog-detalle">
          <img src={articulo.imagen} alt={articulo.titulo} />

          <h1>{articulo.titulo}</h1>

          {articulo.contenido.map((parrafo, indice) => (
            <p key={indice}>{parrafo}</p>
          ))}

          <Link className="btn" to="/blogs">
            Volver al blog
          </Link>
        </article>
      )}
    </main>
  )
}

export default BlogDetalles