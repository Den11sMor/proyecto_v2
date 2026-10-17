import { describe, it, expect } from 'vitest'
import { crearProducto, obtenerProductoPorId } from '../../services/productosService'
import { producto } from '../fixtures'

describe('Creación de productos', () => {
  it('genera un id y persiste valores numéricos', () => {
    const nuevo = crearProducto({ ...producto, precio: '10000', stock: '5' })
    expect(obtenerProductoPorId(nuevo.id)).toEqual({ ...producto, id: nuevo.id })
  })
  it('rechaza precios inválidos y stock fraccionario', () => {
    expect(() => crearProducto({ ...producto, precio: 'abc' })).toThrow()
    expect(() => crearProducto({ ...producto, stock: 1.5 })).toThrow()
  })
})