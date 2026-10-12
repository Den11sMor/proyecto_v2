import { NavLink } from 'react-router';

const enlaces = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/productos', label: 'Productos' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

function Navbar() {
  return (
    <nav className="main-nav" aria-label="Navegación principal">
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

      <NavLink to="/login" className="nav-link">
        Mi cuenta
      </NavLink>

      <NavLink to="/carrito" className="nav-link">
        Carrito
      </NavLink>
    </nav>
  );
}

export default Navbar;