function Footer() {
  // Obtiene automáticamente el año actual para el pie de página.
  const anioActual = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <p>
        © {anioActual} Ferretería Los Maestros.
        Todos los derechos reservados.
      </p>
    </footer>
  )
}

export default Footer
