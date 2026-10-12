import { STORAGE_KEYS } from '../utils/constants'
import { getStorageItem, setStorageItem } from '../utils/storage'

// Lee el carrito guardado.
export const obtenerCarrito = () => {
  const carrito = getStorageItem(STORAGE_KEYS.CART, [])
  return Array.isArray(carrito) ? carrito : []
}

// Guarda los cambios del carrito.
const guardarCarrito = (carrito) => {
  setStorageItem(STORAGE_KEYS.CART, carrito)
  return carrito
}

// Agrega un producto o aumenta su cantidad.
export const agregarAlCarrito = (producto, cantidad = 1) => {
  if (!producto?.id) {
    throw new Error('El producto no es válido.')
  }

  const carrito = obtenerCarrito()
  const cantidadAgregar = Math.max(1, Number(cantidad) || 1)
  const existente = carrito.find(
    (item) => String(item.id) === String(producto.id),
  )

  let nuevoCarrito

  if (existente) {
    nuevoCarrito = carrito.map((item) =>
      String(item.id) === String(producto.id)
        ? { ...item, cantidad: (Number(item.cantidad) || 1) + cantidadAgregar }
        : item,
    )
  } else {
    nuevoCarrito = [
      ...carrito,
      { ...producto, cantidad: cantidadAgregar },
    ]
  }

  return guardarCarrito(nuevoCarrito)
}

// Cambia la cantidad de un producto.
export const actualizarCantidadCarrito = (id, cantidad) => {
  const nuevaCantidad = Number(cantidad)

  if (!Number.isInteger(nuevaCantidad) || nuevaCantidad < 1) {
    throw new Error('La cantidad debe ser un entero mayor que cero.')
  }

  const carrito = obtenerCarrito().map((item) =>
    String(item.id) === String(id)
      ? { ...item, cantidad: nuevaCantidad }
      : item,
  )

  return guardarCarrito(carrito)
}

// Elimina un producto del carrito.
export const eliminarDelCarrito = (id) => {
  const carrito = obtenerCarrito().filter(
    (item) => String(item.id) !== String(id),
  )

  return guardarCarrito(carrito)
}

// Vacía el carrito.
export const vaciarCarrito = () => guardarCarrito([])

// Suma las unidades de todos los productos.
export const obtenerCantidadCarrito = () =>
  obtenerCarrito().reduce(
    (total, item) => total + (Number(item.cantidad) || 0),
    0,
  )

// Calcula el importe de los productos.
export const obtenerSubtotalCarrito = () =>
  obtenerCarrito().reduce(
    (total, item) =>
      total +
      (Number(item.precio) || 0) * (Number(item.cantidad) || 0),
    0,
  )
