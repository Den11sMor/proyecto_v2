import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import '@testing-library/jest-dom/vitest'

import ProductCard from '../../components/products/ProductCard'
import { producto } from '../fixtures'

describe('ProductCard', () => {
  it('muestra el nombre, la imagen, el precio y el stock', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={producto} />
      </MemoryRouter>
    )

    expect(screen.getByText('Martillo de prueba')).toBeInTheDocument()

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      producto.imagen
    )

    expect(screen.getByText('$10.000')).toBeInTheDocument()

    expect(
      screen.getByText('Stock: 5 unidades')
    ).toBeInTheDocument()
  })

  it('muestra Sin stock cuando el producto tiene stock cero', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={{ ...producto, stock: 0 }} />
      </MemoryRouter>
    )

    expect(screen.getByText('Sin stock')).toBeInTheDocument()
  })

  it('usa la imagen de respaldo cuando la imagen falla', () => {
    render(
      <MemoryRouter>
        <ProductCard
          producto={{ ...producto, imagen: '/ausente.jpg' }}
        />
      </MemoryRouter>
    )

    const imagen = screen.getByRole('img')

    fireEvent.error(imagen)

    expect(imagen).toHaveAttribute(
      'src',
      '/img/productos/martillo_img.jpg'
    )
  })

  it('no muestra una tarjeta si no recibe un producto', () => {
    const { container } = render(
      <MemoryRouter>
        <ProductCard producto={null} />
      </MemoryRouter>
    )

    expect(container.querySelector('.product-card')).toBeNull()
  })
})
