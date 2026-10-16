const formatoCLP = (valor) => Number(valor || 0).toLocaleString('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

function CartSummary({ subtotal = 0, iva = Math.round(subtotal * 0.19), total = subtotal + iva, onVaciar, onComprar, deshabilitado = false }) {
  return (
    <section className="totales" aria-label="Resumen de compra">
      <h2>Resumen de compra</h2>
      <p>Subtotal: <strong>{formatoCLP(subtotal)}</strong></p>
      <p>IVA (19%): <strong>{formatoCLP(iva)}</strong></p>
      <p>Total: <strong>{formatoCLP(total)}</strong></p>
      <div className="resumen-carrito-acciones">
        <button type="button" onClick={onVaciar} disabled={deshabilitado}>Vaciar carrito</button>
        <button type="button" onClick={onComprar} disabled={deshabilitado}>Comprar</button>
      </div>
      <p className="texto-secundario">La compra es demostrativa: no se procesa ningún pago real.</p>
    </section>
  )
}

export default CartSummary
