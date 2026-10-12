import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { crearUsuario } from '../../services/usuariosService'

// Formulario para registrar usuarios desde administración.
function UsuarioForm() {
  const navigate = useNavigate()

  const [formulario, setFormulario] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    rol: 'Cliente',
  })

  const [error, setError] = useState('')

  // Actualiza el campo que modifica el usuario.
  const actualizarCampo = (event) => {
    const { name, value } = event.target

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }))
  }

  // Valida y guarda el nuevo usuario.
  const guardar = (event) => {
    event.preventDefault()
    setError('')

    try {
      crearUsuario(formulario)
      navigate('/admin/usuarios')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="formulario-container">
      <h1>Crear usuario</h1>

      <form onSubmit={guardar}>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          value={formulario.nombre}
          onChange={actualizarCampo}
          required
        />

        <label htmlFor="apellidos">Apellidos</label>
        <input
          id="apellidos"
          name="apellidos"
          value={formulario.apellidos}
          onChange={actualizarCampo}
          required
        />

        <label htmlFor="correo">Correo electrónico</label>
        <input
          id="correo"
          name="correo"
          type="email"
          value={formulario.correo}
          onChange={actualizarCampo}
          required
        />

        <label htmlFor="rol">Rol</label>
        <select
          id="rol"
          name="rol"
          value={formulario.rol}
          onChange={actualizarCampo}
        >
          <option value="Cliente">Cliente</option>
          <option value="Administrador">Administrador</option>
        </select>

        {error && <p className="error">{error}</p>}

        <button type="submit">Guardar usuario</button>

        <Link className="btn" to="/admin/usuarios">
          Cancelar
        </Link>
      </form>
    </section>
  )
}

export default UsuarioForm