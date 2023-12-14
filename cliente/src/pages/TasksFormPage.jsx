import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
const TasksFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { crearTarea, verTarea, editarTarea } = useTasks();
  const go = useNavigate();
  const params = useParams();

  const cargarTarea = async () => {
    if (params.id) {
      const task = await verTarea(params.id);
      // console.log(task);
      setValue("title", task.title);
      setValue("description", task.description);
    }
  };
  useEffect(() => {
    cargarTarea();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      editarTarea(params.id, data);
    } else {
      crearTarea(data);
    }
    go("/tasks");
  });
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Titulo" autoFocus className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" {...register("title")} />
          <textarea
            cols="30"
            rows="10"
            placeholder="Descripción"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register("description")}
          ></textarea>
          <button type="submit" className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded my-2">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};
export default TasksFormPage;
