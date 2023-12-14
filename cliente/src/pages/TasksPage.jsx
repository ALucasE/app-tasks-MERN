import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { CardTask } from "../components/CardTask";

const TasksPage = () => {
  const { tasks, mostarTareas } = useTasks();
  useEffect(() => {
    mostarTareas();
  }, []);
  return (
    <>
      <div>
        {tasks.length === 0 && (
          <div className="flex justify-center items-center p-10">
            <div>
              {/* <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" /> */}
              <h1 className="font-bold text-xl">Aún no hay tareas, agregue una nueva tarea</h1>
            </div>
          </div>
        )}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {tasks.map((task) => (
            <CardTask task={task} key={task._id} />
          ))}
        </div>
      </div>
    </>
  );
};
export default TasksPage;
