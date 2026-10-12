import { Link } from 'react-router';

function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="site-logo" aria-label="Ir al inicio">
        Ferretería Los Maestros
      </Link>

      <p className="site-tagline">
        Herramientas y materiales para tus proyectos.
      </p>
    </header>
  );
}

export default Header;