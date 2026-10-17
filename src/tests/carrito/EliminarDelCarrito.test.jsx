import { it, expect } from 'vitest'
import { crearProducto } from '../../services/productosService'
import { agregarAlCarrito, eliminarDelCarrito, obtenerCarrito, vaciarCarrito, obtenerCantidadCarrito } from '../../services/carritoService'
import { producto } from '../fixtures'

it('elimina un producto sin afectar otro y permite vaciar', () => {
  const a = crearProducto(producto), b = crearProducto({ ...producto, nombre: 'Otro' })
  agregarAlCarrito(a); agregarAlCarrito(b, 2); eliminarDelCarrito(a.id)
  expect(obtenerCarrito()).toEqual([{ ...b, cantidad: 2 }])
  expect(obtenerCantidadCarrito()).toBe(2)
  vaciarCarrito(); expect(obtenerCarrito()).toEqual([])
})