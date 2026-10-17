const precio = (n) => Number(n).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })

// Presenta los importes calculados por el servicio, sin duplicar la lógica del IVA en la vista.
export default function CartSummary({ importes }) {
  return <section className="totales" aria-label="Resumen de compra">
    <h2>Resumen de compra</h2>
    <p>Subtotal: <strong>{precio(importes.subtotal)}</strong></p>
    <p>Neto: <strong>{precio(importes.neto)}</strong></p>
    <p>IVA incluido (19%): <strong>{precio(importes.iva)}</strong></p>
    <p>Total: <strong>{precio(importes.total)}</strong></p>
  </section>
}