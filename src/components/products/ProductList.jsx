import ProductCard from './ProductCard'

// Muestra la lista de productos en formato de cuadrícula.
function ProductList({ productos = [] }) {
  // Evita errores si no hay productos disponibles.
  if (!Array.isArray(productos) || productos.length === 0) {
    return (
      <p className="productos-mensaje-vacio">
        No se encontraron productos.
      </p>
    )
  }

  return (
    // La clase CSS controla las columnas y el espacio entre tarjetas.
    <section className="productos-grid">
      {productos.map((producto) => (
        // Cada producto se representa mediante su propia tarjeta.
        <ProductCard
          key={producto.id}
          producto={producto}
        />
      ))}
    </section>
  )
}

export default ProductList