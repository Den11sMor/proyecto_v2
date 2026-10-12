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

  if (
    usuarios.some(
      (usuario) => usuario.correo?.toLowerCase() === correo
    )
  ) {
    throw new Error('Este correo ya está registrado.')
  }

  const nuevoUsuario = {
    ...datos,
    id: crypto.randomUUID(),
    correo,
  }

  // Guarda la lista actualizada.
  setStorageItem(STORAGE_KEYS.USERS, [...usuarios, nuevoUsuario])

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