import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { expect, it } from 'vitest'
import Login from '../pages/login'

it('muestra los campos requeridos para iniciar sesión', () => {
  render(<MemoryRouter><Login /></MemoryRouter>)
  expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeInTheDocument()
  expect(screen.getByLabelText('Correo electrónico')).toHaveAttribute('type', 'email')
  expect(screen.getByLabelText('Contraseña')).toHaveAttribute('type', 'password')
  expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeInTheDocument()
})
