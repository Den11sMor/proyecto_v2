import { obtenerProductoPorId } from '../../services/productosService'

const precio = (n) => Number(n).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })

// Dibuja una fila del carrito; las funciones recibidas por props comunican cambios a la página.
export default function CartItem({ producto, onCantidad, onEliminar }) {
  const actual = obtenerProductoPorId(producto.id)
  return <article className="item-carrito">
    <img src={producto.imagen || '/img/productos/martillo_img.jpg'} alt={producto.nombre} />
    <div><h2>{producto.nombre}</h2><p>Precio: {precio(producto.precio)}</p>
      {!actual && <p role="alert">Este producto ya no está disponible.</p>}
      <label htmlFor={`cantidad-${producto.id}`}>Cantidad de {producto.nombre}</label>
      <input id={`cantidad-${producto.id}`} type="number" min={1} max={actual?.stock || 0} step={1} value={producto.cantidad} onChange={(e) => onCantidad(Number(e.target.value))} />
      <p>Subtotal: <strong>{precio(producto.precio * producto.cantidad)}</strong></p>
      <button onClick={onEliminar} aria-label={`Eliminar ${producto.nombre}`}>Eliminar</button>
    </div>
  </article>
}