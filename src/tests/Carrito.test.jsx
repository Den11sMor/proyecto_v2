import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { expect, it } from 'vitest'
import Carrito from '../pages/carrito'

it('muestra un mensaje cuando el carrito está vacío', () => {
  render(<MemoryRouter><Carrito /></MemoryRouter>)
  expect(screen.getByRole('heading', { name: 'Carrito de compras' })).toBeInTheDocument()
  expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument()
})
