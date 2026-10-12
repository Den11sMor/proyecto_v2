import { Link } from 'react-router'

// Encabezado principal de la ferretería.
function Header() {
  return (
    <header className="site-header">
      {/* Nombre de la tienda: permite volver al inicio. */}
      <Link
        to="/"
        className="site-logo"
        aria-label="Ir al inicio"
      >
        Ferretería Los Maestros
      </Link>

      {/* Frase descriptiva de la tienda. */}
      <p className="site-tagline">
        Herramientas y materiales para tus proyectos.
      </p>
    </header>
  )
}

export default Header
