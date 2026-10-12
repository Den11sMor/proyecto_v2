import { ROUTES } from './constants'

// Centraliza las rutas de la aplicación.
const APP_ROUTES = {
  HOME: ROUTES.HOME,
  PRODUCTS: ROUTES.PRODUCTS,
  CART: ROUTES.CART,
  BLOGS: ROUTES.BLOGS,
  ABOUT: ROUTES.ABOUT,
  CONTACT: ROUTES.CONTACT,
  LOGIN: ROUTES.LOGIN,
  REGISTER: ROUTES.REGISTER,
  ADMIN: ROUTES.ADMIN,

  // Genera la ruta del detalle de un producto.
  productDetail: (id) =>
    `${ROUTES.PRODUCT_DETAIL}/${encodeURIComponent(String(id))}`,

  // Genera la ruta del detalle de un artículo.
  blogDetail: (id) =>
    `${ROUTES.BLOG_DETAIL}/${encodeURIComponent(String(id))}`,
}

export default APP_ROUTES
