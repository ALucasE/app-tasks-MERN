import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const NavBar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <>
      <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
        <Link to={isAuthenticated ? "/tasks" : "/"}>
          <h1>Administrador de Tareas</h1>
        </Link>
        <ul className="flex gap-x-2">
          {isAuthenticated ? (
            <>
              <li>Bienvenido @{user.username}!</li>
              <li>
                <Link to="/tasks/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded">
                  Agregar tarea
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => logout()} className="bg-indigo-500 hover:bg-indigo-700 px-4 py-1 rounded">
                  Cerrar sesión
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="bg-indigo-500 hover:bg-indigo-700 px-4 py-1 rounded-md">
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link to="/register" className="bg-indigo-500 hover:bg-indigo-700 px-4 py-1 rounded-md">
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};
