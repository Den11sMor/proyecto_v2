import { useState } from 'react'
import { Link } from 'react-router'
import {
  eliminarUsuario,
  obtenerUsuarios,
} from '../../services/usuariosService'

// Página administrativa para gestionar usuarios.
function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState(() => obtenerUsuarios())

  // Elimina el usuario seleccionado.
  const eliminar = (id) => {
    if (!window.confirm('¿Deseas eliminar este usuario?')) {
      return
    }

    setUsuarios(eliminarUsuario(id))
  }

  return (
    <section>
      <h1>Administración de usuarios</h1>

      <Link className="btn" to="/admin/usuarios/nuevo">
        Crear usuario
      </Link>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>
                  {[usuario.nombre, usuario.apellidos]
                    .filter(Boolean)
                    .join(' ') || 'Sin nombre'}
                </td>
                <td>{usuario.correo}</td>
                <td>{usuario.rol || 'Cliente'}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => eliminar(usuario.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {usuarios.length === 0 && (
              <tr>
                <td colSpan="4">No hay usuarios registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default UsuariosAdmin