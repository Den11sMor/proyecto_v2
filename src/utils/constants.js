// Centraliza las claves compartidas por los servicios.
export const STORAGE_KEYS = {
  PRODUCTS: 'ferreteria_productos',
  USERS: 'ferreteria_usuarios',
  CART: 'ferreteria_carrito',
  SESSION: 'ferreteria_sesion',
};

// Evita repetir rutas en distintos componentes.
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/productos',
  PRODUCT_DETAIL: '/producto',
  CART: '/carrito',
  BLOGS: '/blogs',
  BLOG_DETAIL: '/blog',
  ABOUT: '/nosotros',
  CONTACT: '/contacto',
  LOGIN: '/login',
  REGISTER: '/registro',
  ADMIN: '/admin',
};

// Valores compartidos para cálculos comerciales.
export const IVA = 0.19;
export const CURRENCY = 'CLP';