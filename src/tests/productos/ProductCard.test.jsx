import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { it, expect } from 'vitest'
import ProductCard from '../../components/products/ProductCard'
import { producto } from '../fixtures'

it('muestra nombre, imagen, precio, stock y enlace correcto', () => {
  render(<MemoryRouter><ProductCard producto={{ ...producto, id: 'p1' }} /></MemoryRouter>)
  expect(screen.getByRole('img')).toHaveAttribute('src', producto.imagen)
  expect(screen.getByText(/10\.000/)).toBeInTheDocument()
  expect(screen.getByText('Stock: 5 unidades')).toBeInTheDocument()
  expect(screen.getByRole('link')).toHaveAttribute('href', '/producto/p1')
})
it('indica sin stock y recupera una imagen rota', () => {
  render(<MemoryRouter><ProductCard producto={{ ...producto, id: 'p2', stock: 0, imagen: '/ausente.jpg' }} /></MemoryRouter>)
  expect(screen.getByText('Sin stock')).toBeInTheDocument()
  fireEvent.error(screen.getByRole('img'))
  expect(screen.getByRole('img')).toHaveAttribute('src', '/img/productos/martillo_img.jpg')
})