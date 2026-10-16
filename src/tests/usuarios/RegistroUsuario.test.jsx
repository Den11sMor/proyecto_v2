import { it, expect } from 'vitest'
import { registrarUsuario } from '../../services/authService'
import { obtenerUsuarios, actualizarUsuario, eliminarUsuario } from '../../services/usuariosService'
import { usuario } from '../fixtures'

it('registra un cliente sin permitir que el registro público asigne administración', () => {
  const nuevo = registrarUsuario({ ...usuario, rol: 'admin' })
  expect(nuevo.rol).toBe('cliente')
  expect(obtenerUsuarios()).toHaveLength(1)
})
it('rechaza correo duplicado normalizado y RUN inválido', () => {
  registrarUsuario(usuario)
  expect(() => registrarUsuario({ ...usuario, run: '111111111', correo: ' ANA@gmail.com ' })).toThrow(/correo/)
  expect(() => registrarUsuario({ ...usuario, run: '123456789' })).toThrow(/RUN/)
})
it('rechaza contraseña corta y campos de dirección vacíos', () => {
  expect(() => registrarUsuario({ ...usuario, password: '12' })).toThrow(/contraseña/)
  expect(() => registrarUsuario({ ...usuario, direccion: '' })).toThrow(/dirección/)
})
it('actualiza usuarios conservando los demás campos y los elimina', () => {
  const u = registrarUsuario(usuario)
  expect(actualizarUsuario(u.id, { nombre: 'Ana María' })).toMatchObject({ nombre: 'Ana María', correo: usuario.correo, rol: 'cliente' })
  eliminarUsuario(u.id); expect(obtenerUsuarios()).toHaveLength(0)
})
