import { STORAGE_KEYS } from '../utils/constants';
import { obtenerUsuarios, crearUsuario, normalizarRol } from './usuariosService';
import { validarCorreo, validarRUN } from '../utils/validations';
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from '../utils/storage';

// Recupera la sesión y comprueba que su usuario siga existiendo y esté activo.
export function obtenerSesion() {
  const sesion = getStorageItem(STORAGE_KEYS.SESSION, null);
  if (!sesion) return null;
  const usuario = obtenerUsuarios().find((u) => u.id === sesion.id && u.activo !== false);
  return usuario ? { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: normalizarRol(usuario.rol) } : null;
}

// Guarda solo los datos necesarios para la sesión; la contraseña queda fuera de este objeto.
export function guardarSesion(usuario) {
  if (!usuario?.id || !usuario?.correo) {
    throw new Error('Los datos del usuario son incompletos.');
  }

  const sesion = {
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: normalizarRol(usuario.rol),
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

// Compara las credenciales con los usuarios locales y crea la sesión si coinciden.
export function iniciarSesion(correo, password) {
  if (!validarCorreo(correo)) throw new Error('Ingresa un correo permitido y válido.')
  const usuario = obtenerUsuarios().find((u) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.password === password)
  if (!usuario || usuario.activo === false) throw new Error('Correo o contraseña incorrectos.')
  return guardarSesion(usuario)
}

// Valida el registro público y crea siempre un cliente, sin permitir elegir permisos de administrador.
export function registrarUsuario(datos) {
  if (!validarRUN(datos.run)) throw new Error('RUN inválido. Escríbelo sin puntos ni guion.')
  if (!datos.region || !datos.comuna || !datos.direccion?.trim() || datos.direccion.trim().length > 300) throw new Error('Completa región, comuna y dirección (máximo 300 caracteres).')
  if (obtenerUsuarios().some((u) => u.run?.toUpperCase() === datos.run.toUpperCase())) throw new Error('Este RUN ya está registrado.')
  return crearUsuario({ ...datos, rol: 'cliente', run: datos.run.toUpperCase() })
}
