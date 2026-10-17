import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { it, expect } from 'vitest'
import Productos from '../../pages/productos'

it('busca por nombre, categoría sin tildes, sin resultados y limpia el filtro', () => {
  render(<MemoryRouter><Productos /></MemoryRouter>)
  const buscar = screen.getByRole('searchbox')
  fireEvent.change(buscar, { target: { value: ' MARTILLO ' } })
  expect(screen.getByText('Martillo')).toBeInTheDocument()
  expect(screen.queryByText('Taladro eléctrico')).not.toBeInTheDocument()
  fireEvent.change(buscar, { target: { value: 'electricas' } })
  expect(screen.getByText('Taladro eléctrico')).toBeInTheDocument()
  fireEvent.change(buscar, { target: { value: 'inexistente' } })
  expect(screen.getByText('No se encontraron productos.')).toBeInTheDocument()
  fireEvent.change(buscar, { target: { value: '' } })
  expect(screen.getAllByRole('article')).toHaveLength(5)
})