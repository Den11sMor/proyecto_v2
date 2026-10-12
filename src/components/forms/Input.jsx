// Campo de entrada reutilizable para formularios.
function Input({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  ...props
}) {
  return (
    <div className="form-field">
      {label && <label htmlFor={id}>{label}</label>}

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
    </div>
  )
}

export default Input