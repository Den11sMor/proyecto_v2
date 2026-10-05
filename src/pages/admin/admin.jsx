import { obtenerProductos } from '../../services/productosService'
import { obtenerUsuarios } from '../../services/usuariosService'

function Admin() {
  const totalProductos = obtenerProductos().length
  const totalUsuarios = obtenerUsuarios().length

  return (
    <>
      <h1>Panel de administración</h1>
      <p>Resumen general de la tienda.</p>

      <section className="dashboard">
        <article className="dashboard-card">
          <h2>{totalProductos}</h2>
          <p>Productos registrados</p>
        </article>

        <article className="dashboard-card">
          <h2>{totalUsuarios}</h2>
          <p>Usuarios registrados</p>
        </article>
      </section>
    </>
  )
}

export default Admin
