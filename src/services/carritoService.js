import { STORAGE_KEYS } from '../utils/constants'
import { getStorageItem, setStorageItem } from '../utils/storage'
import { obtenerProductoPorId } from './productosService'

export const EVENTO_CARRITO_ACTUALIZADO = 'carrito:actualizado'

function notificarCambioCarrito() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENTO_CARRITO_ACTUALIZADO))
  }
}

// Lee el carrito persistido. Un valor corrupto se trata como carrito vacío.
export const obtenerCarrito = () => {
  const carrito = getStorageItem(STORAGE_KEYS.CART, [])
  return Array.isArray(carrito) ? carrito : []
}

const guardarCarrito = (carrito) => {
  if (!setStorageItem(STORAGE_KEYS.CART, carrito)) {
    throw new Error('No se pudo guardar el carrito.')
  }
  notificarCambioCarrito()
  return carrito
}

const cantidadValida = (cantidad) =>
  Number.isInteger(Number(cantidad)) && Number(cantidad) >= 1

function validarStock(producto, cantidadSolicitada) {
  const productoCatalogo = obtenerProductoPorId(producto.id)
  const referencia = productoCatalogo || producto
  const stock = Number(referencia.stock)

  if (Number.isFinite(stock) && stock >= 0 && cantidadSolicitada > stock) {
    throw new Error(`Stock insuficiente. Solo quedan ${stock} unidades de ${referencia.nombre || 'este producto'}.`)
  }

  return referencia
}

// Agrega un producto nuevo o suma unidades a uno que ya está en el carrito.
export const agregarAlCarrito = (producto, cantidad = 1) => {
  if (!producto?.id) {
    throw new Error('El producto no es válido.')
  }
  if (!cantidadValida(cantidad)) {
    throw new Error('La cantidad debe ser un entero mayor que cero.')
  }

  const carrito = obtenerCarrito()
  const cantidadAgregar = Number(cantidad)
  const existente = carrito.find((item) => String(item.id) === String(producto.id))
  const cantidadFinal = (Number(existente?.cantidad) || 0) + cantidadAgregar
  const referencia = validarStock(producto, cantidadFinal)

  const datosProducto = {
    ...(existente || {}),
    ...referencia,
    cantidad: cantidadFinal,
  }

  const nuevoCarrito = existente
    ? carrito.map((item) => String(item.id) === String(producto.id) ? datosProducto : item)
    : [...carrito, datosProducto]

  return guardarCarrito(nuevoCarrito)
}

// Actualiza la cantidad respetando el stock actual del catálogo.
export const actualizarCantidadCarrito = (id, cantidad) => {
  if (!cantidadValida(cantidad)) {
    throw new Error('La cantidad debe ser un entero mayor que cero.')
  }

  const carrito = obtenerCarrito()
  const existente = carrito.find((item) => String(item.id) === String(id))
  if (!existente) throw new Error('El producto no está en el carrito.')

  const referencia = validarStock(existente, Number(cantidad))
  const actualizado = { ...existente, ...referencia, cantidad: Number(cantidad) }

  return guardarCarrito(carrito.map((item) =>
    String(item.id) === String(id) ? actualizado : item,
  ))
}

export const eliminarDelCarrito = (id) =>
  guardarCarrito(obtenerCarrito().filter((item) => String(item.id) !== String(id)))

export const vaciarCarrito = () => guardarCarrito([])

// Cuenta unidades, no líneas distintas, para el contador de navegación.
export const obtenerCantidadCarrito = () =>
  obtenerCarrito().reduce((total, item) => total + (Number(item.cantidad) || 0), 0)

export const obtenerSubtotalCarrito = () =>
  obtenerCarrito().reduce((total, item) =>
    total + (Number(item.precio) || 0) * (Number(item.cantidad) || 0), 0,
  )

// El resumen mantiene la fórmula utilizada por la tienda: subtotal + IVA (19%).
export const obtenerTotalesCarrito = () => {
  const subtotal = obtenerSubtotalCarrito()
  const iva = Math.round(subtotal * 0.19)
  return { subtotal, iva, total: subtotal + iva }
}

export default {
  obtenerCarrito,
  agregarAlCarrito,
  actualizarCantidadCarrito,
  eliminarDelCarrito,
  vaciarCarrito,
  obtenerCantidadCarrito,
  obtenerSubtotalCarrito,
  obtenerTotalesCarrito,
}
