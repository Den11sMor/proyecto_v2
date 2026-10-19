import { STORAGE_KEYS } from '../utils/constants';
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from '../utils/storage';

// Recupera el usuario que mantiene la sesión del prototipo.
export function obtenerSesion() {
  return getStorageItem(STORAGE_KEYS.SESSION, null);
}

// Actualiza la sesión local después de autenticar al usuario.
export function guardarSesion(usuario) {
  if (!usuario?.id || !usuario?.correo) {
    throw new Error('Los datos del usuario son incompletos.');
  }

  const sesion = {
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: usuario.rol || 'cliente',
  };

  if (!setStorageItem(STORAGE_KEYS.SESSION, sesion)) {
    throw new Error('No se pudo guardar la sesión.');
  }

  return sesion;
}

// Cierra la sesión actual sin borrar el carrito ni los productos.
export function cerrarSesion() {
  return removeStorageItem(STORAGE_KEYS.SESSION);
}
// Valida las credenciales contra las cuentas registradas en el almacenamiento local.
export function iniciarSesion(correo, password) {
  const usuarios = getStorageItem(STORAGE_KEYS.USERS, [])
  const correoNormalizado = String(correo || '').trim().toLowerCase()
  const usuario = Array.isArray(usuarios)
    ? usuarios.find((item) => item.correo?.toLowerCase() === correoNormalizado && item.password === password)
    : null

  if (!usuario) throw new Error('Correo o contraseña incorrectos.')
  return guardarSesion(usuario)
}
