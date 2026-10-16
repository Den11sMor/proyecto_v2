import { STORAGE_KEYS } from '../utils/constants'
import { validarUsuario } from '../utils/validations'
import {
  getStorageItem,
  setStorageItem,
} from '../utils/storage'

// Obtiene los usuarios guardados localmente.
const leerUsuarios = () => {
  const usuarios = getStorageItem(STORAGE_KEYS.USERS, [])
  return Array.isArray(usuarios) ? usuarios : []
}

// Unifica los nombres de roles para interpretar Administrador y admin de la misma manera.
export const normalizarRol = (rol = 'cliente') => ({ administrador: 'admin', admin: 'admin', cliente: 'cliente', vendedor: 'vendedor' })[rol.toLowerCase()] || 'cliente'

// Persiste la lista y notifica a los componentes suscritos al almacenamiento.
const guardarUsuarios = (usuarios) => {
  if (!setStorageItem(STORAGE_KEYS.USERS, usuarios)) throw new Error('No se pudieron guardar los usuarios.')
  return usuarios
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
  const errores = validarUsuario(datos)
  if (Object.keys(errores).length) throw new Error(Object.values(errores)[0])
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
    nombre: datos.nombre.trim(),
    apellidos: datos.apellidos.trim(),
    rol: normalizarRol(datos.rol),
    activo: datos.activo !== false,
  }

  // Guarda la lista actualizada.
  guardarUsuarios([...usuarios, nuevoUsuario])

  return nuevoUsuario
}

// Elimina un usuario por su ID.
export const eliminarUsuario = (id) => {
  const usuarios = leerUsuarios().filter(
    (usuario) => String(usuario.id) !== String(id)
  )

  guardarUsuarios(usuarios)
  return usuarios
}

// Edita solo los campos enviados, conserva el id y vuelve a comprobar el correo duplicado.
export const actualizarUsuario = (id, cambios) => {
  const usuarios = leerUsuarios()
  const indice = usuarios.findIndex((u) => String(u.id) === String(id))
  if (indice < 0) throw new Error('Usuario no encontrado.')
  const definidos = Object.fromEntries(Object.entries(cambios).filter(([, v]) => v !== undefined))
  const usuario = { ...usuarios[indice], ...definidos, id: usuarios[indice].id }
  usuario.correo = usuario.correo?.trim().toLowerCase()
  usuario.rol = normalizarRol(usuario.rol)
  const errores = validarUsuario(usuario)
  if (Object.keys(errores).length) throw new Error(Object.values(errores)[0])
  if (usuarios.some((u) => u.id !== usuario.id && u.correo.toLowerCase() === usuario.correo)) throw new Error('Este correo ya está registrado.')
  usuarios[indice] = usuario
  guardarUsuarios(usuarios)
  return usuario
}
