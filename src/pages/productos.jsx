import { useMemo, useState } from 'react'
import ProductList from '../components/products/ProductList'
import { obtenerProductos } from '../services/productosService'

// Página principal del catálogo de productos.
function Productos() {
  // Guarda el texto ingresado en el buscador.
  const [busqueda, setBusqueda] = useState('')

  // Obtiene los productos disponibles al iniciar la página.
  const [productos] = useState(() => {
    const resultado = obtenerProductos()
    return Array.isArray(resultado) ? resultado : []
  })

  // Filtra por nombre o categoría sin modificar la lista original.
  const productosFiltrados = useMemo(() => {
    const normalizar = (valor) => String(valor || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    const texto = normalizar(busqueda.trim())

    if (!texto) {
      return productos
    }

    return productos.filter((producto) => {
      const nombre = normalizar(producto.nombre)
      const categoria = normalizar(producto.categoria)

      return nombre.includes(texto) || categoria.includes(texto)
    })
  }, [busqueda, productos])

  return (
    <main className="pagina-productos">
      <section>
        {/* Título del catálogo. */}
        <h1 className="titulo-pagina">Nuestros productos</h1>

        <p className="productos-descripcion">
          Encuentra las herramientas y los materiales que necesitas
          para tus proyectos.
        </p>

        {/* Buscador del catálogo. */}
        <div className="buscador">
          <input
            type="search"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar por nombre o categoría..."
            aria-label="Buscar productos por nombre o categoría"
          />
        </div>

        {/* Indica cuántos resultados coinciden con la búsqueda. */}
        <p className="productos-resultados" aria-live="polite">
          {productosFiltrados.length === 1
            ? 'Se encontró 1 producto'
            : `Se encontraron ${productosFiltrados.length} productos`}
        </p>

        {/* Muestra las tarjetas del catálogo. */}
        <ProductList productos={productosFiltrados} />
      </section>
    </main>
  )
}

export default Productos