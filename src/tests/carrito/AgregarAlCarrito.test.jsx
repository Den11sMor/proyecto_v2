import { it, expect } from 'vitest'
import { crearProducto } from '../../services/productosService'
import { agregarAlCarrito, obtenerCarrito } from '../../services/carritoService'
import { producto } from '../fixtures'

it('agrega, acumula unidades sin duplicar filas y persiste', () => {
  const p = crearProducto(producto)
  agregarAlCarrito(p, 2); agregarAlCarrito(p, 1)
  expect(obtenerCarrito()).toEqual([{ ...p, cantidad: 3 }])
})
it('rechaza productos inexistentes', () => expect(() => agregarAlCarrito({ id: 'ausente' })).toThrow())