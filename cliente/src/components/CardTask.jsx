import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

export const CardTask = ({ task }) => {
  const { eliminarTarea } = useTasks();

  return (
    <div className="bg-gray-700 max-w-md rounded-md w-full p-10 overflow-hidden shadow-lg">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Link className="bg-blue-500 hover:bg-blue-700 text-white rounded-md p-1" to={`/tasks/${task._id}`}>
            Editar
          </Link>
          <button
            className="bg-red-700 hover:bg-red-500 text-white rounded p-1"
            onClick={() => {
              eliminarTarea(task._id);
            }}
          >
            Eliminar
          </button>
        </div>
      </header>
      <div className="px-6 py-4">
        <p className="text-slate-300">{task.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};
