import { NavLink } from 'react-router'
import useStoredValue from '../../hooks/useStoredValue'
import useAuth from '../../hooks/useAuth'
import { STORAGE_KEYS } from '../../utils/constants'
import { obtenerCantidadCarrito } from '../../services/carritoService'

// Enlaces principales de navegación.
const enlaces = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/productos', label: 'Productos' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

// Barra de navegación de la tienda.
function Navbar() {
  // Escucha el carrito para refrescar el contador sin recargar la página.
  useStoredValue(STORAGE_KEYS.CART)
  const cantidadCarrito = obtenerCantidadCarrito()
  const { usuario, esAdministrador, cerrarSesion } = useAuth()

  return (
    <nav className="main-nav" aria-label="Navegación principal">
      {/* Enlaces de las páginas públicas. */}
      {enlaces.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          {label}
        </NavLink>
      ))}

      {/* Acceso a la cuenta del usuario. */}
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        {usuario ? usuario.nombre : 'Mi cuenta'}
      </NavLink>

      {esAdministrador && <NavLink className="nav-link" to="/admin">Administración</NavLink>}
      {usuario && <button type="button" onClick={cerrarSesion}>Cerrar sesión</button>}

      {/* El espacio entre el nombre y el contador se controla con CSS. */}
      <NavLink
        to="/carrito"
        className={({ isActive }) =>
          isActive ? 'nav-link active carrito-link' : 'nav-link carrito-link'
        }
        aria-label={`Carrito, ${cantidadCarrito} productos`}
      >
        <span>Carrito</span>
        <span className="carrito-contador">
          {cantidadCarrito}
        </span>
      </NavLink>
    </nav>
  )
}

export default Navbar