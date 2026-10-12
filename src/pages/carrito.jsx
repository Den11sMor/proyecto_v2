import { useState } from 'react'
import { Link } from 'react-router'

// Página del carrito de compras.
function Carrito() {
  // Estado provisional para controlar el carrito en esta página.
  const [productos] = useState([])

  // Calcula el subtotal usando el precio y la cantidad de cada producto.
  const subtotal = productos.reduce((acumulado, producto) => {
    const precio = Number(producto.precio) || 0
    const cantidad = Number(producto.cantidad) || 0

    return acumulado + precio * cantidad
  }, 0)

  // Calcula el IVA incluido como referencia para el resumen.
  const iva = Math.round(subtotal * 0.19)
  const total = subtotal + iva

  // Formatea los valores como pesos chilenos.
  const formatoCLP = (valor) =>
    valor.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    })

  // Ejecuta una simulación de compra si hay productos.
  function comprar() {
    if (productos.length === 0) {
      alert('Tu carrito está vacío.')
      return
    }

    alert('Compra simulada correctamente.')
  }

  return (
    <>
      {/* Encabezado de la página del carrito. */}
      <main className="pagina-carrito">
        <h1 className="titulo-pagina">Carrito de compras</h1>

        {/* Enlace para volver a revisar los productos. */}
        <p>
          <Link to="/productos">Seguir comprando</Link>
        </p>

        {/* Lista de productos agregados. */}
        <section className="lista-carrito">
          {productos.length === 0 ? (
            <p className="productos-mensaje-vacio">
              Tu carrito está vacío.
            </p>
          ) : (
            productos.map((producto) => (
              <article
                className="item-carrito"
                key={producto.id}
              >
                <img
                  src={producto.imagen || '/img/producto-sin-imagen.png'}
                  alt={producto.nombre || 'Producto'}
                />

                <div>
                  <h2>{producto.nombre || 'Producto sin nombre'}</h2>
                  <p>Precio: {formatoCLP(Number(producto.precio) || 0)}</p>
                  <p>Cantidad: {producto.cantidad}</p>
                </div>
              </article>
            ))
          )}
        </section>

        {/* Resumen de la compra. */}
        <section className="totales">
          <h2>Resumen de compra</h2>

          <p>
            Subtotal: <strong>{formatoCLP(subtotal)}</strong>
          </p>

          <p>
            IVA (19%): <strong>{formatoCLP(iva)}</strong>
          </p>

          <p>
            Total: <strong>{formatoCLP(total)}</strong>
          </p>

          <button type="button" onClick={comprar}>
            Comprar
          </button>
        </section>
      </main>
    </>
  )
}

export default Carrito
