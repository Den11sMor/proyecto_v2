import { Link } from 'react-router';
import APP_ROUTES from '../../utils/routes';

function ProductCard({ producto }) {
  if (!producto) return null;

  const precio = Number(producto.precio) || 0;
  const stock = Number(producto.stock) || 0;

  return (
    <article className="product-card">
      <Link
        to={APP_ROUTES.productDetail(producto.id)}
        className="product-card-link"
      >
        <img
          src={producto.imagen || '/img/producto-sin-imagen.png'}
          alt={producto.nombre || 'Producto'}
          loading="lazy"
        />

        <div className="product-card-content">
          <p>{producto.categoria || 'Sin categoría'}</p>
          <h2>{producto.nombre || 'Producto sin nombre'}</h2>

          <p className="product-price">
            {precio.toLocaleString('es-CL', {
              style: 'currency',
              currency: 'CLP',
              maximumFractionDigits: 0,
            })}
          </p>

          <p>
            {stock > 0 ? `Stock: ${stock} unidades` : 'Sin stock'}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;