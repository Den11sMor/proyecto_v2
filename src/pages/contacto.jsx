import { useState } from 'react'
import { Link } from 'react-router'

import Input from '../components/forms/Input'
import Button from '../components/forms/Button'

function Contacto() {
  const [
    datos,
    setDatos,
  ] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  })

  const [
    enviado,
    setEnviado,
  ] = useState(false)

  const actualizarCampo = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target

    setDatos(
      (anterior) => ({
        ...anterior,
        [name]: value,
      })
    )

    setEnviado(false)
  }

  const enviar = (
    event
  ) => {
    event.preventDefault()

    setEnviado(true)

    setDatos({
      nombre: '',
      correo: '',
      mensaje: '',
    })
  }

  return (
    <>
      <header>
        <div className="logo">
          <Link to="/">
            Ferretería Los Maestros
          </Link>
        </div>

        <nav>
          <Link to="/">
            Inicio
          </Link>

          <Link to="/productos">
            Productos
          </Link>

          <Link to="/blogs">
            Blog
          </Link>

          <Link to="/nosotros">
            Nosotros
          </Link>

          <Link to="/contacto">
            Contacto
          </Link>

          <Link to="/login">
            Iniciar sesión
          </Link>

          <Link to="/carrito">
            Carrito
          </Link>
        </nav>
      </header>

      <main>

        <section className="formulario-container">

          <h1>
            Contáctanos
          </h1>

          <p>
            ¿Tienes una consulta?
            Envíanos un mensaje.
          </p>

          <form
            onSubmit={enviar}
          >

            <Input
              label="Nombre"
              id="contacto-nombre"
              name="nombre"
              value={
                datos.nombre
              }
              onChange={
                actualizarCampo
              }
              required
            />

            <Input
              label="Correo"
              id="contacto-correo"
              name="correo"
              type="email"
              value={
                datos.correo
              }
              onChange={
                actualizarCampo
              }
              required
            />

            <label
              htmlFor="contacto-mensaje"
            >
              Mensaje
            </label>

            <textarea
              id="contacto-mensaje"
              name="mensaje"
              value={
                datos.mensaje
              }
              onChange={
                actualizarCampo
              }
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
    </>
  )
}

export default Contacto