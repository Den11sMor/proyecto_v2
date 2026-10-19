import { useState } from 'react'
import { Link } from 'react-router'
import useStoredValue from '../hooks/useStoredValue'
import { STORAGE_KEYS } from '../utils/constants'
import { obtenerCarrito, actualizarCantidadCarrito, eliminarDelCarrito, vaciarCarrito, calcularImportes } from '../services/carritoService'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'

export default function Carrito() {
  // El servicio lee los productos persistidos; el hook mantiene esta vista actualizada.
  const productosGuardados = useStoredValue(STORAGE_KEYS.CART, [])
  const productos = Array.isArray(productosGuardados) ? productosGuardados : obtenerCarrito()
  const [mensaje, setMensaje] = useState('')
  // Centraliza las acciones del carrito y muestra el error del servicio si fallan.
  const ejecutar = (accion) => {
    try { accion(); setMensaje('') } catch (err) { setMensaje(err.message) }
  }
  return <main className="pagina-carrito">
    <h1>Carrito de compras</h1><Link to="/productos">Seguir comprando</Link>
    {mensaje && <p role="alert">{mensaje}</p>}
    <section className="lista-carrito" aria-label="Productos en el carrito">
      {productos.length ? productos.map((p) => <CartItem key={p.id} producto={p} onCantidad={(cantidad) => ejecutar(() => actualizarCantidadCarrito(p.id, cantidad))} onEliminar={() => ejecutar(() => eliminarDelCarrito(p.id))} />) : <p>Tu carrito está vacío.</p>}
    </section>
    {!!productos.length && <button onClick={() => ejecutar(vaciarCarrito)}>Vaciar carrito</button>}
    <CartSummary importes={calcularImportes(productos)} />
  </main>
}
