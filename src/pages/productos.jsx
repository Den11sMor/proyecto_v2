import { useMemo, useState } from 'react'
import ProductList from '../components/products/ProductList'
import { obtenerProductos } from '../services/productosService'

function Productos() {
  const [busqueda, setBusqueda] = useState('')
  const [productos] = useState(() => obtenerProductos())

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()

    if (!texto) {
      return productos
    }

    return productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(texto) ||
        producto.categoria.toLowerCase().includes(texto),
    )
  }, [busqueda, productos])

  return (
    <main>
      <section>
        <h1 className="titulo-pagina">Productos</h1>

        <div className="buscador">
          <input
            type="search"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar por nombre o categoría..."
            aria-label="Buscar producto"
          />
        </div>

        <ProductList productos={productosFiltrados} />
      </section>
    </main>
  )
}

export default Productos