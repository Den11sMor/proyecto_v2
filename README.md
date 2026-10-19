# Ferretería Los Maestros — Frontend React

Aplicación web de tienda construida con React, React Router y Vite. El catálogo, los usuarios, la sesión y el carrito de este prototipo se guardan en `localStorage` del navegador; no se trata de un backend seguro ni de una base de datos compartida.

## Requisitos

- Node.js 20.19+ (o una versión compatible con Vite 8).
- npm.

## Instalación y ejecución

```bash
npm install
npm run dev
```

Vite mostrará la dirección local para abrir la tienda en el navegador.

## Comandos de calidad

```bash
npm test       # Ejecuta las pruebas unitarias con Vitest
npm run build  # Genera la versión de producción en dist/
npm run lint   # Ejecuta ESLint
```

La primera instalación debe ejecutarse con `npm install` para sincronizar `package-lock.json` con las dependencias de pruebas añadidas.

## Estructura principal

- `src/pages/`: páginas de la tienda, autenticación y administración.
- `src/components/`: navegación, catálogo y componentes del carrito.
- `src/services/`: operaciones de productos, usuarios, sesión y carrito.
- `src/hooks/`: hooks de estado compartido.
- `src/utils/`: almacenamiento, rutas, constantes y validaciones.
- `src/tests/`: pruebas unitarias y de componentes.
- `docs/`: documentación complementaria de testing.

## Limitaciones del prototipo

- Los datos se guardan localmente en el navegador y no se sincronizan entre dispositivos.
- Las contraseñas se almacenan en `localStorage`; esto solo sirve para una demostración académica. En un sistema real se requiere backend, autenticación segura y contraseñas protegidas con hash.
- La lista de regiones y comunas del registro es parcial y de ejemplo.
