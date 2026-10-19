import { STORAGE_KEYS } from '../utils/constants'
import {
  getStorageItem,
  setStorageItem,
} from '../utils/storage'

// Obtiene los usuarios guardados localmente.
const leerUsuarios = () => {
  const usuarios = getStorageItem(STORAGE_KEYS.USERS, [])
  return Array.isArray(usuarios) ? usuarios : []
}

// Retorna todos los usuarios registrados.
export const obtenerUsuarios = () => leerUsuarios()

// Busca un usuario por su ID.
export const obtenerUsuarioPorId = (id) =>
  leerUsuarios().find(
    (usuario) => String(usuario.id) === String(id)
  ) || null

// Registra un usuario y evita correos duplicados.
export const crearUsuario = (datos) => {
  const usuarios = leerUsuarios()
  const correo = datos.correo?.trim().toLowerCase()

  if (!correo) {
    throw new Error('El correo es obligatorio.')
  }

  if (!datos.password || String(datos.password).length < 4) {
    throw new Error('La contraseña debe tener al menos 4 caracteres.')
  }

  if (!datos.nombre?.trim() || !datos.apellidos?.trim()) {
    throw new Error('El nombre y los apellidos son obligatorios.')
  }

  if (
    usuarios.some(
      (usuario) => usuario.correo?.toLowerCase() === correo
    )
  ) {
    throw new Error('Este correo ya está registrado.')
  }

  const id = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`
  const nuevoUsuario = {
    ...datos,
    id,
    correo,
  }

  // Guarda la lista actualizada y reporta errores de almacenamiento.
  if (!setStorageItem(STORAGE_KEYS.USERS, [...usuarios, nuevoUsuario])) {
    throw new Error('No se pudo guardar el usuario.')
  }

  return nuevoUsuario
}

// Elimina un usuario por su ID.
export const eliminarUsuario = (id) => {
  const usuarios = leerUsuarios().filter(
    (usuario) => String(usuario.id) !== String(id)
  )

  setStorageItem(STORAGE_KEYS.USERS, usuarios)
  return usuarios
}
