import { useState } from 'react'
import Input from '../components/forms/Input'
import Button from '../components/forms/Button'

function Contacto() {
  const [datos, setDatos] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  })

  const [enviado, setEnviado] = useState(false)

  // Actualiza los campos del formulario.
  const actualizarCampo = (event) => {
    const { name, value } = event.target

    setDatos((anterior) => ({
      ...anterior,
      [name]: value,
    }))

    setEnviado(false)
  }

  // Simula el envío del mensaje.
  const enviar = (event) => {
    event.preventDefault()

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

        <p>¿Tienes una consulta? Envíanos un mensaje.</p>

        <form onSubmit={enviar}>
          <Input
            label="Nombre"
            id="contacto-nombre"
            name="nombre"
            value={datos.nombre}
            onChange={actualizarCampo}
            required
          />

          <Input
            label="Correo"
            id="contacto-correo"
            name="correo"
            type="email"
            value={datos.correo}
            onChange={actualizarCampo}
            required
          />

          <label htmlFor="contacto-mensaje">Mensaje</label>

          <textarea
            id="contacto-mensaje"
            name="mensaje"
            value={datos.mensaje}
            onChange={actualizarCampo}
            required
          />

          {enviado && (
            <p className="success">
              Mensaje enviado correctamente.
            </p>
          )}

          <Button type="submit">
            Enviar mensaje
          </Button>
        </form>
      </section>
    </main>
  )
}

export default Contacto