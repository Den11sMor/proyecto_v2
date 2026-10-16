import { it, expect } from 'vitest'
import { calcularImportes, agregarAlCarrito, obtenerSubtotalCarrito } from '../../services/carritoService'
import { crearProducto } from '../../services/productosService'
import { producto } from '../fixtures'

it('calcula cantidades y desglosa IVA incluido sin cobrarlo dos veces', () => {
  const a = crearProducto({ ...producto, precio: 1190 }), b = crearProducto({ ...producto, precio: 2380 })
  agregarAlCarrito(a, 2); agregarAlCarrito(b)
  expect(calcularImportes()).toEqual({ subtotal: 4760, neto: 4000, iva: 760, total: 4760 })
  expect(obtenerSubtotalCarrito()).toBe(4760)
})
it('retorna ceros para un carrito vacío', () => expect(calcularImportes()).toEqual({ subtotal: 0, neto: 0, iva: 0, total: 0 }))
