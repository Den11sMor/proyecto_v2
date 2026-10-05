export const validarProducto = (producto) => {
  const errores = {}

  if (!producto.nombre?.trim()) {
    errores.nombre = 'El nombre es obligatorio.'
  }

  if (!producto.categoria?.trim()) {
    errores.categoria = 'La categoría es obligatoria.'
  }

  if (producto.precio === '' || Number(producto.precio) <= 0) {
    errores.precio = 'El precio debe ser mayor a 0.'
  }

  if (producto.stock === '' || Number(producto.stock) < 0) {
    errores.stock = 'El stock no puede ser negativo.'
  }

  if (!producto.imagen?.trim()) {
    errores.imagen = 'La imagen es obligatoria.'
  }

  if (!producto.descripcion?.trim()) {
    errores.descripcion = 'La descripción es obligatoria.'
  }

  return errores
}

export const formularioValido = (errores) => Object.keys(errores).length === 0