import useStoredValue from './useStoredValue'
import { STORAGE_KEYS } from '../utils/constants'
import { obtenerSesion, guardarSesion, cerrarSesion } from '../services/authService'

// Comparte la lectura de sesión y permisos entre la barra de navegación y el panel.
export default function useAuth() {
  // Escuchar también usuarios permite retirar acceso si una cuenta se elimina o desactiva.
  useStoredValue(STORAGE_KEYS.SESSION)
  useStoredValue(STORAGE_KEYS.USERS)
  const usuario = obtenerSesion()
  return { usuario, autenticado: Boolean(usuario), esAdministrador: usuario?.rol === 'admin', actualizarUsuario: guardarSesion, cerrarSesion }
}
