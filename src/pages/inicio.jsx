import { Link } from 'react-router'
import { obtenerProductos } from '../services/productosService'

function Inicio() {
  const destacados = obtenerProductos().slice(0, 5)
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
          {destacados.map((producto) => (
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