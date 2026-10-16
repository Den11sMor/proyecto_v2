import { it, expect } from 'vitest'
import { crearProducto, actualizarProducto, eliminarProducto } from '../../services/productosService'
import { agregarAlCarrito, actualizarCantidadCarrito, obtenerCarrito } from '../../services/carritoService'
import { producto } from '../fixtures'

it('respeta el stock acumulado y conserva el carrito ante errores', () => {
  const p = crearProducto(producto)
  agregarAlCarrito(p, 4)
  expect(() => agregarAlCarrito(p, 2)).toThrow(/stock/)
  expect(() => actualizarCantidadCarrito(p.id, 6)).toThrow(/stock/)
  expect(obtenerCarrito()[0].cantidad).toBe(4)
})
it('consulta el stock actual y rechaza productos agotados o eliminados', () => {
  const p = crearProducto(producto)
  actualizarProducto(p.id, { stock: 0 })
  expect(() => agregarAlCarrito(p)).toThrow(/stock/)
  eliminarProducto(p.id)
  expect(() => agregarAlCarrito(p)).toThrow()
})
it('rechaza cantidades no enteras o no positivas al agregar', () => {
  const p = crearProducto(producto)
  for (const n of [0, -1, 1.2, NaN]) expect(() => agregarAlCarrito(p, n)).toThrow()
  expect(obtenerCarrito()).toEqual([])
})
