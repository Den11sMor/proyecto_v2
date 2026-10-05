/* @vitest-environment jsdom */
import { beforeEach, describe, expect, it } from 'vitest'
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  obtenerProductoPorId,
  obtenerProductos,
} from '../../services/productosService'

beforeEach(() => {
  localStorage.clear()
})

describe('productosService', () => {
  it('carga productos iniciales', () => {
    expect(obtenerProductos().length).toBeGreaterThan(0)
  })

  it('crea, actualiza y elimina un producto', () => {
    const nuevo = crearProducto({
      nombre: 'Llave inglesa',
      categoria: 'Herramientas',
      precio: 12990,
      stock: 8,
      imagen: '/img/productos/martillo_img.jpg',
      descripcion: 'Llave ajustable de prueba.',
    })

    expect(obtenerProductoPorId(nuevo.id)?.nombre).toBe('Llave inglesa')

    actualizarProducto(nuevo.id, {
      ...nuevo,
      precio: 13990,
    })

    expect(obtenerProductoPorId(nuevo.id)?.precio).toBe(13990)

    eliminarProducto(nuevo.id)
    expect(obtenerProductoPorId(nuevo.id)).toBeNull()
  })
})