import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { iniciarSesion } from '../services/authService'

export default function Login() {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  // Evita recargar la página, autentica con el servicio y redirige según el rol.
  const enviar = (event) => {
    event.preventDefault()
    const datos = new FormData(event.currentTarget)
    try {
      const usuario = iniciarSesion(datos.get('correo'), datos.get('password'))
      navigate(usuario.rol === 'admin' ? '/admin' : '/')
    } catch (err) { setError(err.message) }
  }
  return <main><section className="formulario-container">
    <Link to="/">Volver al inicio</Link><h1>Iniciar sesión</h1>
    <form onSubmit={enviar}>
      <label htmlFor="login-correo">Correo electrónico</label><input id="login-correo" name="correo" type="email" maxLength={100} autoComplete="username" required />
      <label htmlFor="login-password">Contraseña</label><input id="login-password" name="password" type="password" minLength={4} maxLength={10} autoComplete="current-password" required />
      {error && <p className="error" role="alert">{error}</p>}
      <button type="submit">Iniciar sesión</button>
    </form><p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
  </section></main>
}
