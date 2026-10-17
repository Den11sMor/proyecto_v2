import { it, expect } from 'vitest'
import { crearProducto, eliminarProducto, obtenerProductos, obtenerProductoPorId } from '../../services/productosService'
import { producto } from '../fixtures'

it('elimina únicamente el producto elegido y conserva la eliminación al consultar', () => {
  const p = crearProducto(producto)
  const cantidad = obtenerProductos().length
  eliminarProducto(p.id)
  expect(obtenerProductoPorId(p.id)).toBeNull()
  expect(obtenerProductos()).toHaveLength(cantidad - 1)
})