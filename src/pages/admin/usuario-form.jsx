import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { crearUsuario, actualizarUsuario, obtenerUsuarioPorId } from '../../services/usuariosService'

export default function UsuarioForm() {
  // El id de la URL distingue editar una cuenta existente de crear una cuenta nueva.
  const { id } = useParams()
  const navigate = useNavigate()
  const existente = id ? obtenerUsuarioPorId(id) : null
  const [formulario, setFormulario] = useState(() => existente ? { ...existente, password: '' } : { nombre: '', apellidos: '', correo: '', password: '', rol: 'cliente', activo: true })
  const [error, setError] = useState('')
  if (id && !existente) return <section><h1>Usuario no encontrado</h1><Link to="/admin/usuarios">Volver</Link></section>
  // Actualiza el campo indicado por name y conserva los demás valores del formulario.
  const cambiar = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value })
  // Crea o edita la cuenta y vuelve al listado cuando el servicio termina sin errores.
  const guardar = (e) => {
    e.preventDefault()
    try {
      const datos = { ...formulario }
      // Al editar, dejar la nueva contraseña vacía conserva la contraseña anterior.
      if (id && !datos.password) delete datos.password
      if (id) actualizarUsuario(id, datos)
      else crearUsuario(datos)
      navigate('/admin/usuarios')
    } catch (err) { setError(err.message) }
  }
  return <section className="formulario-container"><h1>{id ? 'Editar usuario' : 'Crear usuario'}</h1>
    <form onSubmit={guardar}>
      <label htmlFor="nombre">Nombre</label><input id="nombre" name="nombre" value={formulario.nombre} maxLength={50} onChange={cambiar} required />
      <label htmlFor="apellidos">Apellidos</label><input id="apellidos" name="apellidos" value={formulario.apellidos} maxLength={100} onChange={cambiar} required />
      <label htmlFor="correo">Correo electrónico</label><input id="correo" name="correo" type="email" value={formulario.correo} maxLength={100} onChange={cambiar} required />
      <label htmlFor="password">{id ? 'Nueva contraseña (opcional)' : 'Contraseña'}</label><input id="password" name="password" type="password" minLength={4} maxLength={10} value={formulario.password} onChange={cambiar} required={!id} autoComplete="new-password" />
      <label htmlFor="rol">Rol</label><select id="rol" name="rol" value={formulario.rol} onChange={cambiar}><option value="cliente">Cliente</option><option value="vendedor">Vendedor</option><option value="admin">Administrador</option></select>
      <label htmlFor="activo">Estado</label><select id="activo" value={String(formulario.activo !== false)} onChange={(e) => setFormulario({ ...formulario, activo: e.target.value === 'true' })}><option value="true">Activo</option><option value="false">Inactivo</option></select>
      {error && <p className="error" role="alert">{error}</p>}
      <button type="submit">Guardar usuario</button><Link className="btn" to="/admin/usuarios">Cancelar</Link>
    </form>
  </section>
}
