import { test, expect } from '@playwright/test'

const usuario = { nombre: 'Ana', apellidos: 'Prueba', correo: 'ana@gmail.com', password: 'Clave123', run: '123456785', region: 'Valparaíso', comuna: 'Viña del Mar', direccion: 'Calle de prueba 123' }

async function registrar(page, cambios = {}) {
  const datos = { ...usuario, ...cambios }
  await page.goto('/registro')
  for (const campo of ['run', 'nombre', 'apellidos', 'correo', 'password', 'direccion']) await page.locator(`#${campo}`).fill(datos[campo])
  await page.locator('#region').selectOption(datos.region)
  await page.locator('#comuna').selectOption(datos.comuna)
  await page.getByRole('button', { name: 'Registrarme' }).click()
}

async function login(page, correo = usuario.correo, password = usuario.password) {
  await page.goto('/login')
  await page.getByLabel('Correo electrónico').fill(correo)
  await page.getByLabel('Contraseña', { exact: true }).fill(password)
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()
}

// Crea datos exclusivos del navegador de pruebas; no incorpora cuentas a la aplicación.
async function admin(page) {
  await page.goto('/')
  await page.evaluate(async () => {
    const { crearUsuario } = await import('/src/services/usuariosService.js')
    crearUsuario({ nombre: 'Admin', apellidos: 'Prueba', correo: 'admin@gmail.com', password: 'Admin123', rol: 'admin' })
  })
  await login(page, 'admin@gmail.com', 'Admin123')
  await expect(page.getByRole('heading', { name: 'Panel de administración' })).toBeVisible()
}

test('registro válido, duplicado, login inválido/válido, persistencia, permisos y cierre', async ({ page }) => {
  await registrar(page)
  await expect(page).toHaveURL(/\/login$/)
  await registrar(page, { correo: 'ANA@gmail.com', run: '111111111' })
  await expect(page.getByRole('alert')).toContainText('correo ya está registrado')
  await login(page, usuario.correo, 'incorrecta')
  await expect(page.getByRole('alert')).toContainText('Correo o contraseña incorrectos')
  await login(page)
  await expect(page.getByRole('button', { name: 'Cerrar sesión' })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('button', { name: 'Cerrar sesión' })).toBeVisible()
  await page.goto('/admin/usuarios')
  await expect(page.getByRole('heading', { name: 'Acceso denegado' })).toBeVisible()
  await page.screenshot({ path: 'evidencia/02-permisos-cliente.png', fullPage: true })
  await page.getByRole('link', { name: 'Volver a la tienda' }).click()
  await page.getByRole('button', { name: 'Cerrar sesión' }).click()
  await expect(page.getByRole('link', { name: 'Mi cuenta' })).toBeVisible()
  await page.goto('/admin')
  await expect(page).toHaveURL(/\/login$/)
})

test('administración: crear, editar y eliminar productos y usuarios; indicadores', async ({ page }) => {
  await admin(page)
  await expect(page.locator('.dashboard-card').first()).toContainText('5')
  await page.getByRole('link', { name: 'Productos', exact: true }).click()
  await page.getByRole('link', { name: 'Crear producto' }).click()
  for (const [campo, valor] of Object.entries({ nombre: 'Producto de prueba', categoria: 'Fijaciones', precio: '10000', stock: '4', descripcion: 'Descripción de prueba' })) await page.locator(`#${campo}`).fill(valor)
  await page.getByRole('button', { name: 'Guardar producto' }).click()
  let fila = page.getByRole('row').filter({ hasText: 'Producto de prueba' })
  await expect(fila).toContainText('10.000')
  await fila.getByRole('link', { name: 'Editar' }).click()
  await page.getByLabel('Precio', { exact: true }).fill('12000')
  await page.getByRole('button', { name: 'Guardar producto' }).click()
  fila = page.getByRole('row').filter({ hasText: 'Producto de prueba' })
  await expect(fila).toContainText('12.000')
  await expect(fila).toContainText('Fijaciones')
  await page.screenshot({ path: 'evidencia/03-producto-editado.png', fullPage: true })
  page.on('dialog', (dialog) => dialog.accept())
  await fila.getByRole('button', { name: 'Eliminar' }).click()
  await expect(page.getByText('Producto de prueba')).toHaveCount(0)
  await page.getByRole('link', { name: 'Usuarios', exact: true }).click()
  await page.getByRole('link', { name: 'Crear usuario' }).click()
  for (const [campo, valor] of Object.entries({ nombre: 'Vendedor', apellidos: 'Prueba', correo: 'vendedor@gmail.com', password: 'Venta123' })) await page.locator(`#${campo}`).fill(valor)
  await page.getByLabel('Rol', { exact: true }).selectOption('vendedor')
  await page.getByRole('button', { name: 'Guardar usuario' }).click()
  const usuarioFila = page.getByRole('row').filter({ hasText: 'vendedor@gmail.com' })
  await usuarioFila.getByRole('link', { name: 'Editar' }).click()
  await page.getByLabel('Nombre', { exact: true }).fill('Vendedor editado')
  await page.getByRole('button', { name: 'Guardar usuario' }).click()
  await expect(usuarioFila).toContainText('Vendedor editado')
  await page.screenshot({ path: 'evidencia/04-usuario-editado.png', fullPage: true })
  await usuarioFila.getByRole('button', { name: 'Eliminar' }).click()
  await expect(page.getByText('vendedor@gmail.com')).toHaveCount(0)
})

test('contacto guarda la consulta; blogs, nosotros e imágenes funcionan', async ({ page }) => {
  await page.goto('/contacto')
  await page.getByLabel('Nombre', { exact: true }).fill('Ana Prueba')
  await page.getByLabel('Correo', { exact: true }).fill('ana@gmail.com')
  await page.getByLabel('Mensaje').fill('Consulta sobre un taladro.')
  await page.getByRole('button', { name: 'Guardar consulta' }).click()
  await expect(page.getByText('Consulta guardada en este navegador.')).toBeVisible()
  const guardado = await page.evaluate(() => JSON.parse(localStorage.getItem('ferreteria_contactos')))
  expect(guardado[0].mensaje).toBe('Consulta sobre un taladro.')
  await page.screenshot({ path: 'evidencia/05-contacto-guardado.png', fullPage: true })
  for (const ruta of ['/productos', '/blogs', '/blog/1', '/blog/2', '/nosotros']) {
    await page.goto(ruta)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    for (const img of await page.locator('img').all()) {
      await img.scrollIntoViewIfNeeded()
      await expect.poll(() => img.evaluate((el) => el.complete && el.naturalWidth > 0)).toBe(true)
    }
  }
  await page.goto('/blogs')
  await page.getByRole('link', { name: 'Ver artículo' }).first().click()
  await expect(page).toHaveURL(/\/blog\/1$/)
  await page.getByRole('link', { name: 'Volver al blog' }).click()
  await expect(page).toHaveURL(/\/blogs$/)
})
