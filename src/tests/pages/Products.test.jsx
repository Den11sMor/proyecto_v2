/* @vitest-environment jsdom */
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it } from 'vitest'
import Productos from '../../pages/productos'

beforeEach(() => {
  localStorage.clear()
})

describe('Productos', () => {
  it('muestra el catálogo de productos', () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>,
    )

    expect(screen.getByText('Productos')).toBeTruthy()
    expect(screen.getByText('Martillo')).toBeTruthy()
  })

  it('permite filtrar los productos por nombre', () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('Buscar producto'), {
      target: { value: 'Taladro' },
    })

    expect(screen.getByText('Taladro eléctrico')).toBeTruthy()
    expect(screen.queryByText('Martillo')).toBeNull()
  })
})