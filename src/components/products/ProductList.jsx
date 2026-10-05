import ProductCard from './ProductCard'

function ProductList({ productos }) {
  if (!productos.length) {
    return <p>No se encontraron productos.</p>
  }

  return (
    <section className="productos-grid">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </section>
  )
}

export default ProductList