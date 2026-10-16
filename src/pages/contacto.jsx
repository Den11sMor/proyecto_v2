import { useState } from 'react'
import Input from '../components/forms/Input'
import Button from '../components/forms/Button'
import { setStorageItem, getStorageItem } from '../utils/storage'
import { validarCorreo } from '../utils/validations'

function Contacto() {
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  })

  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  // Actualiza los campos del formulario.
  const actualizarCampo = (event) => {
    const { name, value } = event.target

    setDatos((anterior) => ({
      ...anterior,
      [name]: value,
    }))

    setEnviado(false)
  }

  // Valida y guarda la consulta con fecha en este navegador; no envía correo a un servidor.
  const enviar = (event) => {
    event.preventDefault()

    setError('')
    if (!datos.nombre.trim() || datos.nombre.trim().length > 100 || !validarCorreo(datos.correo) || !datos.mensaje.trim() || datos.mensaje.trim().length > 500) {
      setError('Revisa el nombre (máximo 100), el correo permitido y el mensaje (máximo 500 caracteres).')
      return
    }
    const anteriores = getStorageItem('ferreteria_contactos', [])
    if (!setStorageItem('ferreteria_contactos', [...(Array.isArray(anteriores) ? anteriores : []), { ...datos, fecha: new Date().toISOString() }])) {
      setError('No se pudo guardar la consulta. Intenta nuevamente.')
      return
    }
    setEnviado(true)

    setDatos({
      nombre: '',
      correo: '',
      mensaje: '',
    })
  }

  return (
    <main className="pagina-contacto">
      <section className="formulario-container">
        <h1>Contáctanos</h1>

        <p>Registra tu consulta en este navegador. Este prototipo no envía correos a la tienda.</p>

        <form onSubmit={enviar}>
          <Input
            label="Nombre"
            id="contacto-nombre"
            name="nombre"
            maxLength={100}
            value={datos.nombre}
            onChange={actualizarCampo}
            required
          />

          <Input
            label="Correo"
            id="contacto-correo"
            name="correo"
            maxLength={100}
            type="email"
            value={datos.correo}
            onChange={actualizarCampo}
            required
          />

          <label htmlFor="contacto-mensaje">Mensaje</label>

          <textarea
            id="contacto-mensaje"
            name="mensaje"
            maxLength={500}
            value={datos.mensaje}
            onChange={actualizarCampo}
            required
          />

          {enviado && (
            <p className="success">
              Consulta guardada en este navegador.
            </p>
          )}

          {error && <p role="alert" className="error">{error}</p>}
          <Button type="submit">
            Guardar consulta
          </Button>
        </form>
      </section>
    </main>
  )
}

export default Contacto
