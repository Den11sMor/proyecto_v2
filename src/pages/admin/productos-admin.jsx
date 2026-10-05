import { useState } from 'react'
import { Link } from 'react-router'
import {
  eliminarProducto,
  obtenerProductos,
} from '../../services/productosService'

const formatoPrecio = (valor) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(Number(valor) || 0)

function ProductosAdmin() {
  const [productos, setProductos] = useState(() => obtenerProductos())

  const eliminar = (id) => {
    const confirmar = window.confirm('¿Deseas eliminar este producto?')

    if (!confirmar) {
      return
    }

    setProductos(eliminarProducto(id))
  }

  return (
    <>
      <h1>Administración de productos</h1>

      <div className="admin-actions">
        <Link className="btn" to="/admin/productos/nuevo">
          Crear producto
        </Link>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>{formatoPrecio(producto.precio)}</td>
                <td>{producto.stock}</td>
                <td>
                  <Link className="btn" to={`/admin/productos/${producto.id}`}>
                    Editar
                  </Link>{' '}
                  <button type="button" onClick={() => eliminar(producto.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ProductosAdmin