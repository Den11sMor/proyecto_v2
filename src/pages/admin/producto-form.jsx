import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import {
  actualizarProducto,
  crearProducto,
  obtenerProductoPorId,
} from '../../services/productosService'
import { formularioValido, validarProducto } from '../../utils/validations'

const productoInicial = {
  nombre: '',
  categoria: '',
  precio: '',
  stock: '',
  imagen: '/img/productos/martillo_img.jpg',
  descripcion: '',
}

const imagenesDisponibles = [
  '/img/productos/cinta_img.jpg',
  '/img/productos/destornillador_img.jpg',
  '/img/productos/martillo_img.jpg',
  '/img/productos/taladro_img.jpg',
  '/img/productos/tornillos_img.jpg',
]

function ProductoForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const editando = Boolean(id)

  const [formulario, setFormulario] = useState(productoInicial)
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')

  useEffect(() => {
    if (!editando) {
      return
    }

    const producto = obtenerProductoPorId(id)

    if (!producto) {
      setErrorGeneral('Producto no encontrado.')
      return
    }

    setFormulario(producto)
  }, [editando, id])

  const actualizarCampo = (event) => {
    const { name, value } = event.target
    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }))
  }

  const guardar = (event) => {
    event.preventDefault()
    setErrorGeneral('')

    const nuevosErrores = validarProducto(formulario)
    setErrores(nuevosErrores)

    if (!formularioValido(nuevosErrores)) {
      return
    }

    try {
      if (editando) {
        actualizarProducto(id, formulario)
      } else {
        crearProducto(formulario)
      }

      navigate('/admin/productos')
    } catch (err) {
      setErrorGeneral(err.message)
    }
  }

  return (
    <section className="formulario-container">
      <h1>{editando ? 'Editar producto' : 'Crear producto'}</h1>

      <form onSubmit={guardar}>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          value={formulario.nombre}
          onChange={actualizarCampo}
          maxLength="100"
        />
        {errores.nombre && <p className="error">{errores.nombre}</p>}

        <label htmlFor="categoria">Categoría</label>
        <input
          id="categoria"
          name="categoria"
          value={formulario.categoria}
          onChange={actualizarCampo}
          maxLength="80"
        />
        {errores.categoria && <p className="error">{errores.categoria}</p>}

        <label htmlFor="precio">Precio</label>
        <input
          id="precio"
          name="precio"
          type="number"
          min="1"
          value={formulario.precio}
          onChange={actualizarCampo}
        />
        {errores.precio && <p className="error">{errores.precio}</p>}

        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          name="stock"
          type="number"
          min="0"
          value={formulario.stock}
          onChange={actualizarCampo}
        />
        {errores.stock && <p className="error">{errores.stock}</p>}

        <label htmlFor="imagen">Imagen</label>
        <select
          id="imagen"
          name="imagen"
          value={formulario.imagen}
          onChange={actualizarCampo}
        >
          {imagenesDisponibles.map((imagen) => (
            <option key={imagen} value={imagen}>
              {imagen.split('/').pop()}
            </option>
          ))}
        </select>
        {errores.imagen && <p className="error">{errores.imagen}</p>}

        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formulario.descripcion}
          onChange={actualizarCampo}
          maxLength="500"
        />
        {errores.descripcion && <p className="error">{errores.descripcion}</p>}

        {errorGeneral && <p className="error">{errorGeneral}</p>}

        <button type="submit">Guardar producto</button>
        <Link className="btn" to="/admin/productos">
          Cancelar
        </Link>
      </form>
    </section>
  )
}

export default ProductoForm
