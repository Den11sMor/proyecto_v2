import { NavLink } from 'react-router'

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
  // Contador provisional: después se conectará al carrito real.
  const cantidadCarrito = 0

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
        Mi cuenta
      </NavLink>

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
