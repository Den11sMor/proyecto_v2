import { Link, Navigate, Outlet } from 'react-router';
import useAuth from '../../hooks/useAuth';

function AdminLayout() {
  // Antes de mostrar las rutas internas, exige una sesión válida y el rol admin.
  const { autenticado, esAdministrador, cerrarSesion } = useAuth();
  if (!autenticado) return <Navigate to="/login" replace />;
  if (!esAdministrador) return <section className="formulario-container"><h1>Acceso denegado</h1><p>No tienes permisos de administración.</p><Link to="/">Volver a la tienda</Link></section>;
  return (
    <div className="admin-layout">
      <header className="admin-header">
        <Link to="/admin">
          <strong>Panel administrativo</strong>
        </Link>

        <Link to="/">Volver a la tienda</Link>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
      </header>

      <div className="admin-body">
        <aside className="admin-sidebar">
          <nav aria-label="Administración">
            <Link to="/admin">Resumen</Link>
            <Link to="/admin/productos">Productos</Link>
            <Link to="/admin/usuarios">Usuarios</Link>
          </nav>
        </aside>

        <main className="admin-content">
          {/* Las páginas administrativas se muestran aquí. */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
