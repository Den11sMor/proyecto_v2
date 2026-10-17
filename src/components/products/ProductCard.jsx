import { Link } from 'react-router'
import APP_ROUTES from '../../utils/routes'

// Tarjeta individual de cada producto de la tienda.
function ProductCard({ producto }) {
  // Evita mostrar una tarjeta si no existe el producto.
  if (!producto) return null

  // Convierte los valores a números para evitar errores de formato.
  const precio = Number(producto.precio) || 0
  const stock = Number(producto.stock) || 0

  // Formatea el precio según la moneda chilena.
  const precioFormateado = precio.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  })

  return (
    <article className="product-card">
      {/* El enlace permite acceder al detalle del producto. */}
      <Link
        to={APP_ROUTES.productDetail(producto.id)}
        className="product-card-link"
      >
        {/* Imagen con tamaño uniforme controlado por CSS. */}
        <div className="product-card-image">
          <img
            src={producto.imagen || '/img/productos/martillo_img.jpg'}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/img/productos/martillo_img.jpg' }}
            alt={producto.nombre || 'Imagen del producto'}
            loading="lazy"
          />
        </div>

        {/* Información principal de la tarjeta. */}
        <div className="product-card-content">
          <p className="product-card-category">
            {producto.categoria || 'Sin categoría'}
          </p>

          <h2 className="product-card-title">
            {producto.nombre || 'Producto sin nombre'}
          </h2>

          <p className="product-price">
            {precioFormateado}
          </p>

          {/* Indica si el producto está disponible. */}
          <p
            className={
              stock > 0
                ? 'product-card-stock disponible'
                : 'product-card-stock agotado'
            }
          >
            {stock > 0
              ? `Stock: ${stock} unidades`
              : 'Sin stock'}
          </p>
        </div>
      </Link>
    </article>
  )
}

export default ProductCard