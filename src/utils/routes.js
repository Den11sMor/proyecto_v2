import { ROUTES } from './constants';

// Mantiene las rutas y sus parámetros en un solo lugar.
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

  // Construye una URL para consultar un producto concreto.
  productDetail: (id) =>
    `${ROUTES.PRODUCT_DETAIL}/${encodeURIComponent(String(id))}`,

  // Construye una URL para consultar un artículo concreto.
  blogDetail: (id) =>
    `${ROUTES.BLOG_DETAIL}/${encodeURIComponent(String(id))}`,
};

export default APP_ROUTES;