import { useEffect, useState } from 'react'
import { getStorageItem } from '../utils/storage'

// Mantiene React sincronizado con los cambios hechos al almacenamiento local.
export default function useStoredValue(key, defaultValue = null) {
  const [value, setValue] = useState(() => getStorageItem(key, defaultValue))

  useEffect(() => {
    const actualizar = (event) => {
      // El evento personalizado permite refrescar componentes en la misma pestaña.
      if (!event || !event.detail || event.detail.key === key) {
        setValue(getStorageItem(key, defaultValue))
      }
    }
    const actualizarDesdeOtraPestana = (event) => {
      if (event.key === key) setValue(getStorageItem(key, defaultValue))
    }

    window.addEventListener('ferreteria-storage', actualizar)
    window.addEventListener('storage', actualizarDesdeOtraPestana)
    return () => {
      window.removeEventListener('ferreteria-storage', actualizar)
      window.removeEventListener('storage', actualizarDesdeOtraPestana)
    }
  }, [key, defaultValue])

  return value
}
