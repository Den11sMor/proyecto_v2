function Blogs() {
    return (
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

                    <a href="/carrito">
                        Carrito
                        <span id="contador-carrito">0</span>
                    </a>
                </nav>

            </header>

            <main>

                <h1>Blog</h1>

                <section id="lista-blogs" className="blogs-grid">

                    <article className="blog-card">
                        <img
                            src="/img/blog/herramientas_img.jpg"
                            alt="Herramientas"
                        />

                        <h2>Herramientas</h2>

                        <a href="/blog/1">
                            Ver artículo
                        </a>
                    </article>

                    <article className="blog-card">
                        <img
                            src="/img/blog/hogar_img.jpg"
                            alt="Hogar"
                        />

                        <h2>Hogar</h2>

                        <a href="/blog/2">
                            Ver artículo
                        </a>
                    </article>

                </section>

            </main>
        </>
    )
}
export default Blogs