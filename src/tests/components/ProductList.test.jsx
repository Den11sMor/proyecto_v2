/* @vitest-environment jsdom */
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import ProductList from '../../components/products/ProductList'

const productos = [
  {
    id: '1',
    nombre: 'Martillo',
    categoria: 'Herramientas',
    precio: 8990,
    stock: 10,
    imagen: '/img/productos/martillo_img.jpg',
  },
]

describe('ProductList', () => {
  it('muestra los productos recibidos por props', () => {
    render(
      <MemoryRouter>
        <ProductList productos={productos} />
      </MemoryRouter>,
    )

    expect(screen.getByText('Martillo')).toBeTruthy()
  })

  it('muestra un mensaje cuando no existen productos', () => {
    render(
      <MemoryRouter>
        <ProductList productos={[]} />
      </MemoryRouter>,
    )

    expect(screen.getByText('No se encontraron productos.')).toBeTruthy()
  })
})