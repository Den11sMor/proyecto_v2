import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router'
import { it, expect } from 'vitest'
import AdminLayout from '../../layouts/AdminLayout/AdminLayout'
import { crearUsuario, actualizarUsuario } from '../../services/usuariosService'
import { iniciarSesion, obtenerSesion } from '../../services/authService'
import { usuario } from '../fixtures'

function montar() {
  render(<MemoryRouter initialEntries={['/admin']}><Routes><Route path="/login" element={<h1>Acceso requerido</h1>} /><Route path="/admin" element={<AdminLayout />}><Route index element={<h1>Contenido privado</h1>} /></Route></Routes></MemoryRouter>)
}
it('redirige al login cuando no hay sesión', () => { montar(); expect(screen.getByText('Acceso requerido')).toBeInTheDocument() })
it.each(['cliente', 'vendedor'])('deniega acceso al rol %s', (rol) => {
  crearUsuario({ ...usuario, rol }); iniciarSesion(usuario.correo, usuario.password)
  montar(); expect(screen.getByText('Acceso denegado')).toBeInTheDocument()
  expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument()
})
it('permite al administrador y normaliza roles anteriores', () => {
  crearUsuario({ ...usuario, rol: 'Administrador' }); iniciarSesion(usuario.correo, usuario.password)
  montar(); expect(screen.getByText('Contenido privado')).toBeInTheDocument()
})
it('invalida una sesión de un usuario desactivado', () => {
  const u = crearUsuario({ ...usuario, rol: 'admin' }); iniciarSesion(usuario.correo, usuario.password)
  actualizarUsuario(u.id, { activo: false })
  expect(obtenerSesion()).toBeNull()
})
