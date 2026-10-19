// Recupera datos del almacenamiento local.
export function getStorageItem(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(key)
    return value === null ? defaultValue : JSON.parse(value)
  } catch (error) {
    console.error(`No se pudo leer ${key}:`, error)
    return defaultValue
  }
}

// Guarda objetos y arreglos en JSON y notifica a los componentes React.
export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ferreteria-storage', { detail: { key } }))
    }
    return true
  } catch (error) {
    console.error(`No se pudo guardar ${key}:`, error)
    return false
  }
}

// Elimina un dato específico y notifica a los componentes React.
export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ferreteria-storage', { detail: { key } }))
    }
    return true
  } catch (error) {
    console.error(`No se pudo eliminar ${key}:`, error)
    return false
  }
}
