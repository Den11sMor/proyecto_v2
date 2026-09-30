function Contacto(){
    return (
        <>
            <header>

        <div className="logo">
            <a href="../index.html">
                Ferretería Los Maestros
            </a>
        </div>

        <nav>
            <a href="../index.html">Inicio</a>
            <a href="productos.html">Productos</a>
            <a href="blogs.html">Blog</a>
            <a href="nosotros.html">Nosotros</a>
            <a href="contacto.html">Contacto</a>
            <a href="login.html">Iniciar sesión</a>

            <a href="carrito.html">
                Carrito
                <span id="contador-carrito">0</span>
            </a>
        </nav>

    </header>

    <main>

        <section className="formulario-container">

            <h1>Contáctanos</h1>

            <form id="form-contacto">

                <label htmlFor="contacto-nombre">
                    Nombre
                </label>

                <input
                    type="text"
                    id="contacto-nombre"
                    maxLength="100"
                    required
                />

                <label htmlFor="contacto-correo">
                    Correo
                </label>

                <input
                    type="email"
                    id="contacto-correo"
                    maxLength="100"
                    required
                />

                <label htmlFor="contacto-mensaje">
                    Mensaje
                </label>

                <textarea
                    id="contacto-mensaje"
                    maxLength="500"
                    required
                />

                <button type="submit">
                    Enviar mensaje
                </button>

            </form>

        </section>

    </main>
        </>
    )
}
export default Contacto