const formatoCLP = (valor) => Number(valor || 0).toLocaleString('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

function CartItem({ producto, onActualizarCantidad, onEliminar }) {
  if (!producto) return null

  const cantidad = Number(producto.cantidad) || 1
  const stock = Number(producto.stock)
  const stockMaximo = Number.isFinite(stock) ? stock : undefined

  return (
    <article className="item-carrito" data-testid={`cart-item-${producto.id}`}>
      <img
        src={producto.imagen || '/img/producto-sin-imagen.svg'}
        alt={producto.nombre || 'Producto'}
        onError={(event) => { event.currentTarget.src = '/img/producto-sin-imagen.svg' }}
      />
      <div className="item-carrito-info">
        <h2>{producto.nombre || 'Producto sin nombre'}</h2>
        <p>Precio unitario: {formatoCLP(producto.precio)}</p>
        <p>Subtotal: <strong>{formatoCLP((Number(producto.precio) || 0) * cantidad)}</strong></p>
        <label htmlFor={`cantidad-${producto.id}`}>Cantidad</label>
        <input
          id={`cantidad-${producto.id}`}
          aria-label={`Cantidad de ${producto.nombre}`}
          type="number"
          min="1"
          max={stockMaximo}
          value={cantidad}
          onChange={(event) => onActualizarCantidad(producto.id, event.target.value)}
        />
        {stockMaximo !== undefined && <small>Stock disponible: {stockMaximo}</small>}
        <button type="button" onClick={() => onEliminar(producto.id)}>
          Eliminar
        </button>
      </div>
    </article>
  )
}

export default CartItem
