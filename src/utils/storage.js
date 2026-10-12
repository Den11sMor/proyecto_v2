// Recupera datos guardados y controla errores de lectura.
export function getStorageItem(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(key);

    return value === null ? defaultValue : JSON.parse(value);
  } catch (error) {
    console.error(`No se pudo leer ${key}:`, error);
    return defaultValue;
  }
}

// Guarda objetos y arreglos como JSON.
export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`No se pudo guardar ${key}:`, error);
    return false;
  }
}

// Elimina únicamente la información indicada.
export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`No se pudo eliminar ${key}:`, error);
    return false;
  }
}