import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { obtenerProductoPorId } from '../services/productosService'
import { agregarAlCarrito } from '../services/carritoService'

// Formatea los precios en pesos chilenos.
const formatoCLP = (precio) =>
  Number(precio || 0).toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  })

function DetalleProducto() {
  const { id } = useParams()

  // Busca el producto indicado por la URL.
  const producto = obtenerProductoPorId(id)

  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')

  // Revisa la cantidad del formulario; el servicio comprueba además las unidades ya agregadas.
  const manejarAgregar = () => {
    if (!producto) return

    const stock = Number(producto.stock) || 0

    if (cantidad < 1 || !Number.isInteger(cantidad)) {
      setMensaje('Ingresa una cantidad válida.')
      return
    }

    if (cantidad > stock) {
      setMensaje('No hay suficiente stock disponible.')
      return
    }

    try {
      agregarAlCarrito(producto, cantidad)
      setMensaje('Producto agregado al carrito.')
    } catch (error) {
      setMensaje(error.message)
    }
  }

  if (!producto) {
    return (
      <main className="pagina-detalle">
        <section className="formulario-container">
          <h1>Producto no encontrado</h1>

          <Link className="btn" to="/productos">
            Volver a productos
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="pagina-detalle">
      <section className="detalle-producto">
        <img
          src={producto.imagen || '/img/productos/martillo_img.jpg'}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/img/productos/martillo_img.jpg' }}
          alt={producto.nombre}
        />

        <div>
          <h1>{producto.nombre}</h1>

          <p>{producto.descripcion}</p>

          <p className="precio">
            {formatoCLP(producto.precio)}
          </p>

          <p>
            {Number(producto.stock) > 0
              ? `Stock disponible: ${producto.stock} unidades`
              : 'Producto sin stock'}
          </p>

          <label htmlFor="cantidad">Cantidad</label>

          <input
            id="cantidad"
            type="number"
            min="1"
            max={Number(producto.stock) || 1}
            value={cantidad}
            onChange={(event) => {
              setCantidad(Number(event.target.value))
              setMensaje('')
            }}
          />

          <div className="producto-botones">
            <button
              type="button"
              onClick={manejarAgregar}
              disabled={Number(producto.stock) <= 0}
            >
              Agregar al carrito
            </button>

            <Link className="btn" to="/productos">
              Volver a productos
            </Link>
          </div>

          {mensaje && (
            <p role="status" aria-live="polite">
              {mensaje}
            </p>
          )}
        </div>
      </section>
    </main>
  )
}

export default DetalleProducto