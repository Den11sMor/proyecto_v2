import { STORAGE_KEYS } from '../utils/constants'
import { getStorageItem, setStorageItem } from '../utils/storage'
import { obtenerProductoPorId } from './productosService'

// Convierte el valor del formulario y rechaza ceros, negativos y cantidades fraccionarias.
const cantidadValida = (valor) => {
  const cantidad = Number(valor)
  if (!Number.isInteger(cantidad) || cantidad < 1) {
    throw new Error('La cantidad debe ser un entero mayor que cero.')
  }
  return cantidad
}

// Comprueba la cantidad solicitada contra las existencias del catálogo actual.
const validarStock = (producto, cantidad) => {
  if (!producto || cantidad > Number(producto.stock)) {
    throw new Error('No hay suficiente stock disponible.')
  }
}

// Lee el carrito guardado.
export const obtenerCarrito = () => {
  const carrito = getStorageItem(STORAGE_KEYS.CART, [])
  return Array.isArray(carrito) ? carrito : []
}

// Guarda los cambios del carrito.
const guardarCarrito = (carrito) => {
  if (!setStorageItem(STORAGE_KEYS.CART, carrito)) throw new Error('No se pudo guardar el carrito.')
  return carrito
}

// Agrega un producto o aumenta su cantidad.
export const agregarAlCarrito = (producto, cantidad = 1) => {
  if (!producto?.id) {
    throw new Error('El producto no es válido.')
  }

  const actual = obtenerProductoPorId(producto.id)
  const carrito = obtenerCarrito()
  const cantidadAgregar = cantidadValida(cantidad)
  const existente = carrito.find(
    (item) => String(item.id) === String(producto.id),
  )

  let nuevoCarrito
  // Cuenta también lo que ya estaba agregado para no superar el stock con varios clics.
  validarStock(actual, cantidadAgregar + (existente?.cantidad || 0))

  if (existente) {
    nuevoCarrito = carrito.map((item) =>
      String(item.id) === String(producto.id)
        ? { ...item, cantidad: (Number(item.cantidad) || 1) + cantidadAgregar }
        : item,
    )
  } else {
    nuevoCarrito = [
      ...carrito,
      { ...actual, cantidad: cantidadAgregar },
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

  if (!obtenerCarrito().some((item) => String(item.id) === String(id))) throw new Error('Producto no encontrado en el carrito.')
  validarStock(obtenerProductoPorId(id), nuevaCantidad)

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

// Suma unidades, no filas: dos martillos y un taladro muestran un contador de 3.
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

// Los precios del catálogo son precios finales con IVA incluido.
export const calcularImportes = (carrito = obtenerCarrito()) => {
  const total = carrito.reduce((suma, item) => suma + Number(item.precio) * Number(item.cantidad), 0)
  // Divide el precio final por 1,19 para separar el neto; no vuelve a sumar IVA al total.
  const neto = Math.round(total / 1.19)
  return { subtotal: total, neto, iva: total - neto, total }
}
