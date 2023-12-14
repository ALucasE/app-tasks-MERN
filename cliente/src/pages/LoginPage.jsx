import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const go = useNavigate();
  const { iniciarSesion, errors: loginErrors, isAuthenticated } = useAuth();
  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    iniciarSesion(data);
  });

  //ENVÍA A TASKS SI INICIO SESIÓN
  useEffect(() => {
    if (isAuthenticated) go("/tasks");
  }, [isAuthenticated]);
  return (
    <>
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
          <h1 className="text-2xl font-bold">Inicia sesión!</h1>
          {loginErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white text-center my-2">
              {error}
            </div>
          ))}
          <form onSubmit={onSubmit}>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-sm my-2"
              placeholder="email@email.com"
            />
            {errors.email && <p className="text-red-500">email es requerido</p>}
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-sm my-2"
              placeholder="***********"
            />
            {errors.password && <p className="text-red-500">password es requerido</p>}
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </form>
          <p className="flex gap-x-2 justify-between">
            Aun no tienes una cuenta?{" "}
            <Link to={"/register"} className="text-sky-400">
              Registrate!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
