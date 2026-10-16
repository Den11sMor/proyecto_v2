# Entrega de Luis como integrante 2

## Alcance de esta rama

Se actualizó `LuisDev` con `main` mediante fast-forward y se conservaron los commits anteriores del equipo. Esta entrega incorpora usuarios, autenticación, administración y contacto. No incluye las páginas corregidas de catálogo/carrito ni los ocho archivos de tests del integrante 1.

Los cambios compartidos necesarios son almacenamiento reactivo, hooks de sesión, validaciones, enlaces de cuenta en Navbar, rutas de edición y configuración de tests. El servicio de carrito incluye las comprobaciones de stock e importes que requieren los dos tests de carrito asignados al integrante 2.

## Cambios

- Registro con RUN, correo, contraseña, dirección y comprobación de duplicados. El registro público solo crea clientes.
- Inicio de sesión con validación de credenciales, persistencia y cierre sincronizado entre componentes.
- Panel protegido: anónimos redirigidos al login; clientes y vendedores sin acceso administrativo.
- Formularios administrativos de productos y usuarios conectados; edición de usuarios, contraseña opcional al editar, cambio de rol y activación/desactivación.
- Rutas de edición añadidas conservando las rutas existentes del equipo.
- Contacto guarda consultas con fecha en este navegador e informa que no envía correos.
- Cantidades enteras positivas, stock acumulado y neto/IVA incluido comprobados en el servicio compartido de carrito.
- Comentarios breves para explicar las funciones durante la presentación.

## Siete archivos de tests asignados

1. `src/tests/carrito/ValidarStock.test.jsx`
2. `src/tests/carrito/CalcularTotal.test.jsx`
3. `src/tests/usuarios/RegistroUsuario.test.jsx`
4. `src/tests/usuarios/ValidarCorreo.test.jsx`
5. `src/tests/usuarios/InicioSesion.test.jsx`
6. `src/tests/usuarios/CerrarSesion.test.jsx`
7. `src/tests/usuarios/PermisosAdmin.test.jsx`

Se conservaron tres suites anteriores con contenido y se corrigieron dos selectores desactualizados de la prueba de catálogo. Se retiraron únicamente tres archivos de tests que estaban vacíos. Los datos compartidos de pruebas están en `src/tests/fixtures.js`.

## Comprobaciones ejecutadas

- Vitest: 33 casos correctos en 10 archivos (27 casos de los siete archivos asignados y 6 de las suites anteriores).
- ESLint sin errores.
- Compilación Vite correcta.
- Playwright con Edge: 3 recorridos aprobados. Son pruebas automatizadas en navegador, no una afirmación de pruebas manuales realizadas por los estudiantes.

| Recorrido | Comprobaciones | Capturas |
| --- | --- | --- |
| Registro y acceso | Registro, correo duplicado, contraseña incorrecta, login correcto, persistencia, denegación de permisos y cierre | `evidencia/02-permisos-cliente.png` |
| Administración | Crear, editar y eliminar producto; crear, editar y eliminar usuario; indicadores iniciales | `evidencia/03-producto-editado.png`, `evidencia/04-usuario-editado.png` |
| Contacto y contenido | Consulta guardada, artículos abiertos, enlaces de vuelta e imágenes cargadas | `evidencia/05-contacto-guardado.png` |

Los resultados están en `evidencia/resultados-unitarios.json` y `evidencia/resultados-navegador.json`. El reporte HTML de Playwright se genera al repetir las pruebas y no se versiona.

## Repetir las pruebas

Se incluye `pnpm-lock.yaml` con las versiones verificadas. El `package-lock.json` anterior estaba desactualizado respecto de las nuevas dependencias de tests y se sustituyó por ese archivo de bloqueo.

```powershell
pnpm install --frozen-lockfile
pnpm test
pnpm lint
pnpm build
$env:PLAYWRIGHT_CHANNEL = 'msedge'
pnpm test:e2e
```

Playwright inicia temporalmente la aplicación en el puerto 5180. Si no tienes Edge, instala Chromium con `pnpm exec playwright install chromium` y no definas `PLAYWRIGHT_CHANNEL`.

Para probar a mano, ejecuta `pnpm dev` y abre la dirección indicada. También puedes usar `npm install` y los scripts `npm test`, `npm run lint`, `npm run build` y `npm run dev`.

## Administrador de demostración

El registro público no permite crear administradores. En el servidor de desarrollo, abre la consola del navegador y ejecuta una sola vez con datos ficticios:

```js
const { crearUsuario } = await import('/src/services/usuariosService.js')
crearUsuario({ nombre: 'Admin', apellidos: 'Demostración', correo: 'admin@gmail.com', password: 'Admin123', rol: 'admin' })
```

Después inicia sesión desde el formulario normal. Los navegadores de prueba son aislados, por lo que sus cuentas no aparecen en el navegador habitual.

## Pendiente de integrar con el equipo

Los cambios de páginas del integrante 1 se integran desde su propia rama. En esta rama, la página del carrito conserva su estado provisional hasta recibir esa integración, aunque el servicio y el contador ya estén comprobados. No se presenta esta rama individual como la entrega completa de los tres integrantes.

El proyecto utiliza servicios locales del frontend, no un backend. Las cuentas y contraseñas de este prototipo se guardan en el navegador; se utilizan únicamente datos ficticios. El control de permisos del servidor, pagos reales y envío de correos requieren un backend.
