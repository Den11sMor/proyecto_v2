import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { it, expect } from 'vitest'
import { iniciarSesion, obtenerSesion, registrarUsuario } from '../../services/authService'
import Login from '../../pages/login'
import { usuario } from '../fixtures'

it('inicia sesión, normaliza el correo y persiste sin exponer contraseña en la sesión', () => {
  registrarUsuario(usuario)
  iniciarSesion(' ANA@GMAIL.COM ', usuario.password)
  expect(obtenerSesion()).toMatchObject({ correo: usuario.correo, rol: 'cliente' })
  expect(obtenerSesion()).not.toHaveProperty('password')
})
it('muestra error por credenciales incorrectas en el formulario', () => {
  registrarUsuario(usuario)
  render(<MemoryRouter><Login /></MemoryRouter>)
  fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: usuario.correo } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'mala123' } })
  fireEvent.submit(screen.getByRole('button', { name: 'Iniciar sesión' }).closest('form'))
  expect(screen.getByRole('alert')).toHaveTextContent('Correo o contraseña incorrectos.')
  expect(obtenerSesion()).toBeNull()
})
