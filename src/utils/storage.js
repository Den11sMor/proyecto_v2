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

// Convierte objetos a JSON para guardarlos y avisa a React mediante un evento propio.
export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new CustomEvent('ferreteria:storage', { detail: { key } }))
    return true
  } catch (error) {
    console.error(`No se pudo guardar ${key}:`, error)
    return false
  }
}

// Elimina un dato específico del almacenamiento.
export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key)
    window.dispatchEvent(new CustomEvent('ferreteria:storage', { detail: { key } }))
    return true
  } catch (error) {
    console.error(`No se pudo eliminar ${key}:`, error)
    return false
  }
}
