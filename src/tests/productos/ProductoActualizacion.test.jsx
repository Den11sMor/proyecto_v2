import { it, expect } from 'vitest'
import { crearProducto, actualizarProducto, obtenerProductoPorId } from '../../services/productosService'
import { producto } from '../fixtures'

it('modifica solo los campos enviados y conserva id, imagen, descripción y stock', () => {
  const p = crearProducto(producto)
  actualizarProducto(p.id, { precio: 15000, imagen: undefined, id: 'otro' })
  expect(obtenerProductoPorId(p.id)).toEqual({ ...p, precio: 15000 })
})
it('rechaza actualizar un id inexistente', () => expect(() => actualizarProducto('ausente', { precio: 50 })).toThrow('Producto no encontrado'))