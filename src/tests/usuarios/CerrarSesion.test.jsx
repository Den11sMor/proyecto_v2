import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { it, expect } from 'vitest'
import { iniciarSesion, obtenerSesion, registrarUsuario, cerrarSesion } from '../../services/authService'
import { agregarAlCarrito, obtenerCarrito } from '../../services/carritoService'
import { crearProducto } from '../../services/productosService'
import Navbar from '../../components/common/Navbar'
import { producto, usuario } from '../fixtures'

it('cierra sesión y actualiza todas las instancias de la barra sin borrar el carrito', () => {
  registrarUsuario(usuario); iniciarSesion(usuario.correo, usuario.password)
  agregarAlCarrito(crearProducto(producto))
  render(<MemoryRouter><Navbar /><Navbar /></MemoryRouter>)
  fireEvent.click(screen.getAllByRole('button', { name: 'Cerrar sesión' })[0])
  expect(obtenerSesion()).toBeNull()
  expect(screen.queryByRole('button', { name: 'Cerrar sesión' })).not.toBeInTheDocument()
  expect(obtenerCarrito()).toHaveLength(1)
})
it('refleja el inicio y cierre de sesión externos al componente', () => {
  registrarUsuario(usuario)
  render(<MemoryRouter><Navbar /></MemoryRouter>)
  act(() => iniciarSesion(usuario.correo, usuario.password))
  expect(screen.getByRole('button', { name: 'Cerrar sesión' })).toBeInTheDocument()
  act(() => cerrarSesion())
  expect(screen.queryByRole('button', { name: 'Cerrar sesión' })).not.toBeInTheDocument()
})
