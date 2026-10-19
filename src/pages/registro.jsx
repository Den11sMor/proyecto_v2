import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { crearUsuario } from '../services/usuariosService'

// Catálogo básico para que los selectores sean utilizables sin una API externa.
const comunasPorRegion = {
  'Región Metropolitana de Santiago': ['Santiago', 'Maipú', 'Puente Alto', 'La Florida', 'Las Condes'],
  'Región de Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'],
  'Región del Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles', 'San Pedro de la Paz'],
  'Región de La Araucanía': ['Temuco', 'Padre Las Casas', 'Villarrica'],
  'Región de Antofagasta': ['Antofagasta', 'Calama', 'Tocopilla'],
}

function Registro() {
  const navigate = useNavigate()
  const [formulario, setFormulario] = useState({ run: '', nombre: '', apellidos: '', correo: '', password: '', region: '', comuna: '', direccion: '' })
  const [error, setError] = useState('')

  const actualizarCampo = (event) => {
    const { name, value } = event.target
    setFormulario((actual) => ({ ...actual, [name]: value, ...(name === 'region' ? { comuna: '' } : {}) }))
  }

  const manejarEnvio = (event) => {
    event.preventDefault()
    setError('')
    try {
      const usuario = crearUsuario({ ...formulario, rol: 'cliente' })
      // El registro no inicia sesión automáticamente; lleva a la pantalla de acceso.
      navigate('/login', { state: { correo: usuario.correo } })
    } catch (err) {
      setError(err.message || 'No se pudo crear la cuenta.')
    }
  }

  return (
    <>
      <header><div className="logo"><Link to="/">Ferretería Los Maestros</Link></div></header>
      <main>
        <section className="formulario-container">
          <Link to="/" className="volver-inicio">← Volver al inicio</Link>
          <h1>Crear cuenta</h1>
          <form id="form-registro" onSubmit={manejarEnvio}>
            <label htmlFor="run">RUN</label>
            <input id="run" name="run" maxLength={12} placeholder="19011022-K" required value={formulario.run} onChange={actualizarCampo} />
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" maxLength={50} required value={formulario.nombre} onChange={actualizarCampo} />
            <label htmlFor="apellidos">Apellidos</label>
            <input id="apellidos" name="apellidos" maxLength={100} required value={formulario.apellidos} onChange={actualizarCampo} />
            <label htmlFor="correo">Correo</label>
            <input id="correo" name="correo" type="email" maxLength={100} required value={formulario.correo} onChange={actualizarCampo} />
            <label htmlFor="password">Contraseña</label>
            <input id="password" name="password" type="password" maxLength={100} minLength={4} required value={formulario.password} onChange={actualizarCampo} />
            <label htmlFor="region">Región</label>
            <select id="region" name="region" required value={formulario.region} onChange={actualizarCampo}>
              <option value="">Seleccione región</option>
              {Object.keys(comunasPorRegion).map((region) => <option key={region} value={region}>{region}</option>)}
            </select>
            <label htmlFor="comuna">Comuna</label>
            <select id="comuna" name="comuna" required disabled={!formulario.region} value={formulario.comuna} onChange={actualizarCampo}>
              <option value="">Seleccione comuna</option>
              {(comunasPorRegion[formulario.region] || []).map((comuna) => <option key={comuna} value={comuna}>{comuna}</option>)}
            </select>
            <label htmlFor="direccion">Dirección</label>
            <textarea id="direccion" name="direccion" maxLength={300} required value={formulario.direccion} onChange={actualizarCampo} />
            {error && <p className="error" role="alert">{error}</p>}
            <button type="submit">Registrarme</button>
          </form>
          <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
        </section>
      </main>
    </>
  )
}

export default Registro
