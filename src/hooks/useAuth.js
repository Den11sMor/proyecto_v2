import { useCallback, useState } from 'react';
import {
  obtenerSesion,
  cerrarSesion as cerrarSesionService,
} from '../services/authService';

function useAuth() {
  const [usuario, setUsuario] = useState(() => obtenerSesion());

  // Actualiza el estado React después de iniciar sesión.
  const actualizarUsuario = useCallback((nuevoUsuario) => {
    setUsuario(nuevoUsuario);
  }, []);

  // Elimina la sesión y actualiza la interfaz.
  const cerrarSesion = useCallback(() => {
    cerrarSesionService();
    setUsuario(null);
  }, []);

  return {
    usuario,
    autenticado: Boolean(usuario),
    esAdministrador: usuario?.rol === 'admin',
    actualizarUsuario,
    cerrarSesion,
  };
}

export default useAuth;