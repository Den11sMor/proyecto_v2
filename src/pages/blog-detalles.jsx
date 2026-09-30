function BlogDetalles (){
    return(
        <>
            <header>

        <div className="logo">

            <a href="/">
                Ferretería Los Maestros
            </a>

        </div>
        
        <nav>
            <a href="/">Inicio</a>
            <a href="/productos">Productos</a>
            <a href="/blogs">Blog</a>
            <a href="/nosotros">Nosotros</a>
            <a href="/contacto">Contacto</a>
            <a href="/login">Iniciar sesión</a>
            <a href="/carrito">
                Carrito
                <span id="contador-carrito">0</span>
            </a>
        </nav>

    </header>


    <main>

        <section
            id="blog-detalle"
            className="formulario-container">

        </section>

    </main>
        </>
    )
}
export default BlogDetalles