import { Link } from 'react-router'

// Productos destacados de la portada.
const productosDestacados = [
  {
    id: 1,
    nombre: 'Cinta aisladora',
    imagen: '/img/productos/cinta_img.jpg',
  },
  {
    id: 2,
    nombre: 'Destornillador',
    imagen: '/img/productos/destornillador_img.jpg',
  },
  {
    id: 3,
    nombre: 'Martillo',
    imagen: '/img/productos/martillo_img.jpg',
  },
  {
    id: 4,
    nombre: 'Taladro eléctrico',
    imagen: '/img/productos/taladro_img.jpg',
  },
  {
    id: 5,
    nombre: 'Caja de tornillos',
    imagen: '/img/productos/tornillos_img.jpg',
  },
]

function Inicio() {
  return (
    <main className="pagina-inicio">
      {/* Presentación principal de la ferretería. */}
      <section className="hero">
        <h1>Ferretería Los Maestros</h1>

        <p>Herramientas y productos para tus proyectos.</p>

        <Link className="btn" to="/productos">
          Ver productos
        </Link>
      </section>

      {/* Productos destacados de la tienda. */}
      <section className="productos-destacados">
        <h2 className="titulo-pagina">Productos destacados</h2>

        <div className="productos-grid">
          {productosDestacados.map((producto) => (
            <article className="producto-card" key={producto.id}>
              <img
                src={producto.imagen}
                alt={producto.nombre}
                loading="lazy"
              />

              <h3>{producto.nombre}</h3>

              <Link to={`/producto/${producto.id}`}>
                Ver detalle
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Inicio
