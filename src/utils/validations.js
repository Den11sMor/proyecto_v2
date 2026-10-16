// Devuelve errores por campo para mostrarlos junto a los controles del formulario.
export const validarProducto = (producto) => {
  const errores = {}

  if (!producto.nombre?.trim()) {
    errores.nombre = 'El nombre es obligatorio.'
  }

  if (!producto.categoria?.trim()) {
    errores.categoria = 'La categoría es obligatoria.'
  }

  if (producto.precio === '' || !Number.isFinite(Number(producto.precio)) || Number(producto.precio) < 0) {
    errores.precio = 'El precio debe ser un número mayor o igual a 0.'
  }

  if (producto.stock === '' || !Number.isInteger(Number(producto.stock)) || Number(producto.stock) < 0) {
    errores.stock = 'El stock debe ser un entero mayor o igual a 0.'
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

// Exige un correo completo y uno de los tres dominios permitidos por la pauta.
export const validarCorreo = (correo = '') => correo.length <= 100 && /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(correo.trim())

// Calcula el dígito verificador del RUN con módulo 11 y lo compara con el ingresado.
export const validarRUN = (run = '') => {
  const valor = run.toUpperCase()
  if (!/^\d{6,8}[0-9K]$/.test(valor)) return false
  let suma = 0, factor = 2
  for (let i = valor.length - 2; i >= 0; i--) {
    suma += Number(valor[i]) * factor
    factor = factor === 7 ? 2 : factor + 1
  }
  const digito = 11 - suma % 11
  return valor.at(-1) === (digito === 11 ? '0' : digito === 10 ? 'K' : String(digito))
}

// Reúne las reglas comunes al registro público y a los formularios de administración.
export const validarUsuario = (datos) => {
  const errores = {}
  if (!datos.nombre?.trim() || datos.nombre.trim().length > 50) errores.nombre = 'Nombre obligatorio, máximo 50 caracteres.'
  if (!datos.apellidos?.trim() || datos.apellidos.trim().length > 100) errores.apellidos = 'Apellidos obligatorios, máximo 100 caracteres.'
  if (!validarCorreo(datos.correo)) errores.correo = 'Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com válido.'
  if (!datos.password || datos.password.length < 4 || datos.password.length > 10) errores.password = 'La contraseña debe tener entre 4 y 10 caracteres.'
  if (datos.run && !validarRUN(datos.run)) errores.run = 'RUN inválido. Escríbelo sin puntos ni guion.'
  return errores
}
