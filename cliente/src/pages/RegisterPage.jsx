import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registrar, isAuthenticated, errors: registerErrors } = useAuth();

  const go = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    registrar(values);
  });

  //ENVÍA A TASKS SI INICIO SESIÓN
  useEffect(() => {
    if (isAuthenticated) go("/tasks");
  }, [isAuthenticated]);

  return (
    <>
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
          <h1 className="text-2xl font-bold">Regístrate!</h1>
          {registerErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white text-center my-2">
              {error}
            </div>
          ))}
          <form onSubmit={onSubmit}>
            <input
              type="text"
              {...register("username", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-sm my-2"
              placeholder="username"
            />
            {errors.useranme && <p className="text-red-500">username es requerido</p>}
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
              Register
            </button>
          </form>
          <p className="flex gap-x-2 justify-between">
            Ya tienes una cuenta?{" "}
            <Link to={"/login"} className="text-sky-400">
              Iniciar sesión!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
