import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { iniciarSesion } from '../services/authService'

function Login() {
  const navigate = useNavigate()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const manejarEnvio = (event) => {
    event.preventDefault()
    setError('')
    try {
      const usuario = iniciarSesion(correo, password)
      navigate(usuario.rol === 'admin' ? '/admin' : '/')
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesión.')
    }
  }

  return (
    <>
      <header><div className="logo"><Link to="/">Ferretería Los Maestros</Link></div></header>
      <main>
        <section className="formulario-container">
          <Link to="/" className="volver-inicio">← Volver al inicio</Link>
          <h1>Iniciar sesión</h1>
          <form id="form-login" onSubmit={manejarEnvio}>
            <label htmlFor="login-correo">Correo electrónico</label>
            <input id="login-correo" name="correo" type="email" maxLength={100} required value={correo} onChange={(event) => setCorreo(event.target.value)} />
            <label htmlFor="login-password">Contraseña</label>
            <input id="login-password" name="password" type="password" maxLength={100} minLength={4} required value={password} onChange={(event) => setPassword(event.target.value)} />
            {error && <p className="error" role="alert">{error}</p>}
            <button type="submit">Iniciar sesión</button>
          </form>
          <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
        </section>
      </main>
    </>
  )
}

export default Login
