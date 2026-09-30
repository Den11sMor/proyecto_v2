function Registro() {
  return (
    <>
      <header>
        <div className="logo">
          <a href="/">Ferretería Los Maestros</a>
        </div>
      </header>

      <main>
        <section className="formulario-container">
          <h1>Crear cuenta</h1>

          <form id="form-registro">
            <label>RUN</label>
            <input
              id="run"
              maxLength="9"
              placeholder="19011022K"
              required
            />

            <label>Nombre</label>
            <input
              id="nombre"
              maxLength="50"
              required
            />

            <label>Apellidos</label>
            <input
              id="apellidos"
              maxLength="100"
              required
            />

            <label>Correo</label>
            <input
              id="correo"
              maxLength="100"
              required
              type="email"
            />

            <label>Contraseña</label>
            <input
              id="password"
              maxLength="10"
              minLength="4"
              required
              type="password"
            />

            <button type="submit">
              Registrarme
            </button>
          </form>
        </section>
      </main>
    </>
  )
}

export default Registro