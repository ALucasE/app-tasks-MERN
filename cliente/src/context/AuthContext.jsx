import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  //ESTADOS
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  //FUNCION PARA REGISTARSE
  const registrar = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data.error);
      // console.log(error.response.data);
    }
  };

  //FUNCION PARA INICIAR SESION
  const iniciarSesion = async (user) => {
    try {
      const res = await loginRequest(user);
      // console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data.error);
      // console.log(error.response.data);
    }
  };

  //
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  //REINICIA LOS ERRORES
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  //VALIDACION AUTENTICACION
  const checkLogin = async () => {
    const cookies = Cookies.get();

    if (!cookies.token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const res = await verifyTokenRequest(cookies.token);
      if (!res.data) return setIsAuthenticated(false);
      setIsAuthenticated(true);
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);
  return <AuthContext.Provider value={{ registrar, iniciarSesion, user, isAuthenticated, errors, loading, logout }}>{children}</AuthContext.Provider>;
};
