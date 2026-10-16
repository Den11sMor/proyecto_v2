import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { registrarUsuario } from '../services/authService'

// Muestra de comunas agrupadas por región para los dos selectores relacionados.
const regiones = {
  'Arica y Parinacota': ['Arica', 'Camarones', 'Putre', 'General Lagos'],
  'Tarapacá': ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Pica'],
  'Antofagasta': ['Antofagasta', 'Calama', 'Tocopilla', 'Mejillones'],
  'Atacama': ['Copiapó', 'Caldera', 'Vallenar', 'Chañaral'],
  'Coquimbo': ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel'],
  'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'],
  'Metropolitana': ['Santiago', 'Maipú', 'Puente Alto', 'Las Condes', 'La Florida', 'Renca'],
  'O’Higgins': ['Rancagua', 'San Fernando', 'Rengo', 'Machalí'],
  'Maule': ['Talca', 'Curicó', 'Linares', 'Constitución'],
  'Ñuble': ['Chillán', 'San Carlos', 'Bulnes', 'Quirihue'],
  'Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles', 'Coronel'],
  'La Araucanía': ['Temuco', 'Angol', 'Villarrica', 'Pucón'],
  'Los Ríos': ['Valdivia', 'La Unión', 'Río Bueno', 'Panguipulli'],
  'Los Lagos': ['Puerto Montt', 'Osorno', 'Castro', 'Ancud'],
  'Aysén': ['Coyhaique', 'Aysén', 'Chile Chico', 'Cochrane'],
  'Magallanes': ['Punta Arenas', 'Puerto Natales', 'Porvenir', 'Cabo de Hornos'],
}

export default function Registro() {
  const [region, setRegion] = useState('')
  const [comuna, setComuna] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  // Convierte los campos en un objeto y delega las validaciones y el guardado al servicio.
  const enviar = (event) => {
    event.preventDefault()
    try {
      registrarUsuario(Object.fromEntries(new FormData(event.currentTarget)))
      navigate('/login')
    } catch (err) { setError(err.message) }
  }
  return <main><section className="formulario-container">
    <Link to="/">Volver al inicio</Link><h1>Crear cuenta</h1>
    <form onSubmit={enviar}>
      <label htmlFor="run">RUN</label><input id="run" name="run" maxLength={9} placeholder="Sin puntos ni guion" required />
      <label htmlFor="nombre">Nombre</label><input id="nombre" name="nombre" maxLength={50} autoComplete="given-name" required />
      <label htmlFor="apellidos">Apellidos</label><input id="apellidos" name="apellidos" maxLength={100} autoComplete="family-name" required />
      <label htmlFor="correo">Correo</label><input id="correo" name="correo" type="email" maxLength={100} autoComplete="email" required />
      <label htmlFor="password">Contraseña</label><input id="password" name="password" type="password" minLength={4} maxLength={10} autoComplete="new-password" required />
      <label htmlFor="region">Región</label><select id="region" name="region" value={region} onChange={(e) => { setRegion(e.target.value); setComuna('') }} required>
        <option value="">Seleccione región</option>{Object.keys(regiones).map((r) => <option key={r}>{r}</option>)}
      </select>
      <label htmlFor="comuna">Comuna</label><select id="comuna" name="comuna" value={comuna} onChange={(e) => setComuna(e.target.value)} required>
        <option value="">Seleccione comuna</option>{(regiones[region] || []).map((c) => <option key={c}>{c}</option>)}
      </select>
      <label htmlFor="direccion">Dirección</label><textarea id="direccion" name="direccion" maxLength={300} autoComplete="street-address" required />
      {error && <p className="error" role="alert">{error}</p>}
      <button type="submit">Registrarme</button>
    </form><Link to="/login">Ya tengo cuenta</Link>
  </section></main>
}
