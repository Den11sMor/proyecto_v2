import { useCallback, useSyncExternalStore } from 'react'

// storage escucha otras pestañas; el evento propio escucha cambios dentro de esta misma pestaña.
const subscribe = (callback) => {
  window.addEventListener('storage', callback)
  window.addEventListener('ferreteria:storage', callback)
  return () => {
    // Retira los listeners al desmontar el componente para evitar suscripciones acumuladas.
    window.removeEventListener('storage', callback)
    window.removeEventListener('ferreteria:storage', callback)
  }
}

// Hace que React vuelva a leer una clave cuando cambia su valor en localStorage.
export default function useStoredValue(key) {
  // Se compara el texto guardado para mantener estable la lectura mientras no haya cambios.
  const snapshot = useCallback(() => localStorage.getItem(key), [key])
  const raw = useSyncExternalStore(subscribe, snapshot, () => null)
  try { return raw ? JSON.parse(raw) : null } catch { return null }
}
