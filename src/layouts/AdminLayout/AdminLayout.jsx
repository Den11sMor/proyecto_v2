import { Link, Outlet } from 'react-router';

function AdminLayout() {
  return (
    <div className="admin-layout">
      <header className="admin-header">
        <Link to="/admin">
          <strong>Panel administrativo</strong>
        </Link>

        <Link to="/">Volver a la tienda</Link>
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