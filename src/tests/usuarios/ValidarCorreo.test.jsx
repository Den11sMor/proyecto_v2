import { it, expect } from 'vitest'
import { validarCorreo } from '../../utils/validations'

it.each(['ana@duoc.cl', 'ana@profesor.duoc.cl', 'ANA@GMAIL.COM'])('acepta %s', (correo) => expect(validarCorreo(correo)).toBe(true))
it.each(['@gmail.com', 'ana@@gmail.com', 'ana gmail.com', 'ana@gmail.com.ejemplo.cl', 'ana@hotmail.com', 'a'.repeat(101) + '@gmail.com'])('rechaza %s', (correo) => expect(validarCorreo(correo)).toBe(false))
