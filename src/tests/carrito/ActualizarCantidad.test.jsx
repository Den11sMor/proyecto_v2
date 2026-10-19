import { it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { crearProducto } from '../../services/productosService'
import { agregarAlCarrito, actualizarCantidadCarrito, obtenerCarrito } from '../../services/carritoService'
import Carrito from '../../pages/carrito'
import Navbar from '../../components/common/Navbar'
import { producto } from '../fixtures'

it('conecta cantidad, subtotal, contador y eliminación en la interfaz', () => {
  const p = crearProducto(producto); agregarAlCarrito(p)
  render(<MemoryRouter><Navbar /><Carrito /></MemoryRouter>)
  fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '3' } })
  expect(obtenerCarrito()[0].cantidad).toBe(3)
  expect(screen.getByRole('link', { name: 'Carrito, 3 productos' })).toBeInTheDocument()
  expect(screen.getAllByText(/30\.000/).length).toBeGreaterThan(0)
  fireEvent.click(screen.getByRole('button', { name: `Eliminar ${p.nombre}` }))
  expect(screen.getByRole('link', { name: 'Carrito, 0 productos' })).toBeInTheDocument()
  expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument()
})
it('rechaza cero, negativos y fracciones sin modificar lo guardado', () => {
  const p = crearProducto(producto); agregarAlCarrito(p)
  for (const n of [0, -1, 1.5, NaN]) expect(() => actualizarCantidadCarrito(p.id, n)).toThrow()
  expect(obtenerCarrito()[0].cantidad).toBe(1)
})
