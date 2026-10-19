# Documento de cobertura de testing

## Objetivo

Registrar el alcance de las pruebas unitarias del frontend de Ferretería Los Maestros. Este documento identifica los módulos cubiertos por los casos automatizados; no reemplaza un informe generado por una ejecución real de Vitest.

## Alcance previsto

| Área | Casos cubiertos por pruebas | Estado esperado |
|---|---|---|
| Catálogo y servicio de productos | Lectura inicial, creación, actualización, eliminación y validación de datos | Ejecutar `npm test` para confirmar |
| Búsqueda de productos | Búsqueda por nombre/categoría, texto sin tildes y ausencia de resultados | Ejecutar `npm test` para confirmar |
| Tarjetas y lista de productos | Renderizado, stock, imagen alternativa y lista vacía | Ejecutar `npm test` para confirmar |
| Carrito | Agregar, acumular, validar stock/cantidad, actualizar, eliminar y vaciar | Ejecutar `npm test` para confirmar |
| Navegación/contador del carrito | Reflejar las unidades guardadas en la interfaz | Ejecutar `npm test` para confirmar |
| Inicio de sesión | Renderizado de campos y controles del formulario | Ejecutar `npm test` para confirmar |

## Ejecución reproducible

Desde la raíz del proyecto:

```bash
npm install
npm test
npm run build
```

Para generar un reporte cuantitativo de cobertura se debe instalar/configurar el proveedor de cobertura de Vitest y ejecutar una orden con `--coverage`. No se informan porcentajes aquí porque no se ha podido ejecutar el conjunto de pruebas en este entorno.

## Limitaciones conocidas

- El registro solo ofrece un conjunto parcial de regiones y comunas.
- La autenticación usa almacenamiento local y no es apropiada para producción.
- Antes de entregar, adjuntar la salida real de Vitest y corregir cualquier prueba fallida.
----- FIN DEL ARCHIVO -----

##############################################################################
RUTA: src/hooks/useStoredValue.js
##############################################################################
----- INICIO DEL ARCHIVO -----
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
