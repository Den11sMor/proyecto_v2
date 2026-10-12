// Botón reutilizable para las acciones de la aplicación.
function Button({
  children,
  type = 'button',
  onClick,
  disabled = false,
  className = 'btn',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  )
}

export default Button