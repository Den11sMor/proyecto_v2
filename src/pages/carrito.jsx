function Carrito(){
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

            <a href="/carrito">
                Carrito
                <span id="contador-carrito">0</span>
            </a>
        </nav>

    </header>

    <main>

        <h1>Carrito de compras</h1>

        <section id="lista-carrito"></section>

        <section className="totales">

            <p>
                Subtotal:
                <strong id="subtotal">$0</strong>
            </p>

            <p>
                IVA:
                <strong id="iva">$0</strong>
            </p>

            <p>
                Total:
                <strong id="total">$0</strong>
            </p>

            <button
                type="button"
                onClick={() => alert('Compra simulada correctamente.')}>
                Comprar
            </button>

        </section>

    </main>
        </>
    )
}
export default Carrito