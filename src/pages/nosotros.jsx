import { Link } from 'react-router'

function Nosotros() {
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

          <Link to="/contacto">
            Contacto
          </Link>
        </nav>
      </header>

      <main>
        <h1>Nosotros</h1>

        <section className="formulario-container">

          <h2>
            Ferretería Los Maestros
          </h2>

          <p>
            Somos una ferretería
            orientada a entregar
            productos y soluciones
            para proyectos de
            construcción, reparación
            y mejoramiento del hogar.
          </p>

          <h3>Misión</h3>

          <p>
            Entregar productos de
            calidad y una atención
            cercana y confiable a
            nuestros clientes.
          </p>

          <h3>Visión</h3>

          <p>
            Ser una ferretería
            reconocida por su
            servicio, variedad y
            confianza.
          </p>

          <h3>
            Nuestro compromiso
          </h3>

          <p>
            Ayudar a nuestros
            clientes a encontrar las
            herramientas y materiales
            necesarios para realizar
            sus proyectos.
          </p>

        </section>
      </main>
    </>
  )
}

export default Nosotros