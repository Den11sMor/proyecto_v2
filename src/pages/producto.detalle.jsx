import { useState } from 'react'

function DetalleProducto() {
  const codigo = localStorage.getItem('productoSelecionado')

  const [cantidad, setCantidad] = useState(1)

  return (
    <>
      <header>
        <div className="logo">
          <a href="/">Ferretería Los Maestros</a>
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
          id="detalle-producto"
          className="detalle-producto"
        >
          <h1>Detalle del producto</h1>

          <p>
            Código del producto: {codigo || 'No seleccionado'}
          </p>

          <label htmlFor="cantidad">Cantidad</label>

          <input
            id="cantidad"
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />

          <br />
          <br />

          <a className="btn" href="/productos">
            Volver a productos
          </a>
        </section>
      </main>
    </>
  )
}

export default DetalleProducto