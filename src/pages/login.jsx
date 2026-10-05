function Login(){
    return(
        <>
            <header>
            <div className="logo"><a href="/">Ferretería Los Maestros</a></div>
        </header>

        <main>
            <section className="formulario-container">
                <h1>Iniciar sesión</h1>
                <form id="form-login">
                    <label>Correo electrónico</label>
                    <input id="login-correo" maxLength="100" required="" type="email" />
                    <label>Contraseña</label>
                    <input id="login-password" maxLength="10" minLength="4" required="" type="password" />
                    <p className="error" id="error-login"></p>
                    <button type="submit">Iniciar sesión</button>
                </form>
                <p>¿No tienes cuenta?<a href="/registro">Regístrate</a></p>
            </section>
        </main>
        </>
    )
}
export default Login