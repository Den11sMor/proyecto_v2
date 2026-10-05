import { STORAGE_KEYS } from '../utils/constants'
import { getStorageItem, setStorageItem } from '../utils/storage'

const PRODUCTOS_INICIALES = [
  {
    id: '1',
    nombre: 'Cinta aisladora',
    categoria: 'Accesorios',
    precio: 2490,
    stock: 20,
    imagen: '/img/productos/cinta_img.jpg',
    descripcion: 'Cinta aisladora resistente para trabajos eléctricos y reparaciones generales.',
  },
  {
    id: '2',
    nombre: 'Destornillador',
    categoria: 'Herramientas manuales',
    precio: 5990,
    stock: 15,
    imagen: '/img/productos/destornillador_img.jpg',
    descripcion: 'Destornillador de uso general con mango ergonómico y punta resistente.',
  },
  {
    id: '3',
    nombre: 'Martillo',
    categoria: 'Herramientas manuales',
    precio: 8990,
    stock: 10,
    imagen: '/img/productos/martillo_img.jpg',
    descripcion: 'Martillo multipropósito ideal para reparaciones y trabajos de construcción.',
  },
  {
    id: '4',
    nombre: 'Taladro eléctrico',
    categoria: 'Herramientas eléctricas',
    precio: 49990,
    stock: 5,
    imagen: '/img/productos/taladro_img.jpg',
    descripcion: 'Taladro eléctrico para perforaciones en madera, metal y otros materiales.',
  },
  {
    id: '5',
    nombre: 'Caja de tornillos',
    categoria: 'Fijaciones',
    precio: 3990,
    stock: 30,
    imagen: '/img/productos/tornillos_img.jpg',
    descripcion: 'Caja de tornillos para diferentes trabajos de montaje y reparación.',
  },
]

const leerProductos = () => {
  const productos = getStorageItem(STORAGE_KEYS.PRODUCTS, null)

  if (!Array.isArray(productos)) {
    setStorageItem(STORAGE_KEYS.PRODUCTS, PRODUCTOS_INICIALES)
    return [...PRODUCTOS_INICIALES]
  }

  return productos
}

const guardarProductos = (productos) => {
  setStorageItem(STORAGE_KEYS.PRODUCTS, productos)
  return productos
}

const crearId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const normalizarProducto = (producto) => ({
  ...producto,
  nombre: producto.nombre?.trim(),
  categoria: producto.categoria?.trim(),
  descripcion: producto.descripcion?.trim(),
  imagen: producto.imagen?.trim(),
  precio: Number(producto.precio),
  stock: Number(producto.stock),
})

export const obtenerProductos = () => leerProductos()

export const obtenerProductoPorId = (id) =>
  leerProductos().find((producto) => String(producto.id) === String(id)) || null

export const crearProducto = (datos) => {
  const productos = leerProductos()
  const nuevoProducto = {
    id: crearId(),
    ...normalizarProducto(datos),
  }

  guardarProductos([...productos, nuevoProducto])
  return nuevoProducto
}

export const actualizarProducto = (id, cambios) => {
  const productos = leerProductos()
  const indice = productos.findIndex(
    (producto) => String(producto.id) === String(id),
  )

  if (indice === -1) {
    throw new Error('Producto no encontrado.')
  }

  productos[indice] = {
    ...productos[indice],
    ...normalizarProducto(cambios),
    id: productos[indice].id,
  }

  guardarProductos(productos)
  return productos[indice]
}

export const eliminarProducto = (id) => {
  const productos = leerProductos().filter(
    (producto) => String(producto.id) !== String(id),
  )

  return guardarProductos(productos)
}

export default {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
}
