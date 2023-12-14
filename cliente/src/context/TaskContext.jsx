import { createContext, useContext, useState } from "react";
import { createTaskRequest, deleteTaskRequest, getTaskRequest, getTasksRequest, updateTaskRequest } from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  //FUNCIÓN PARA CREAR TAREA
  const crearTarea = async (task) => {
    try {
      const res = await createTaskRequest(task);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  //FUNCIÓN PARA VER TODAS LAS TAREAS
  const mostarTareas = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  //FUNCIÓN PARA VER UN TAREA
  const verTarea = async (id) => {
    try {
      const res = await getTaskRequest(id);
      // console.log(res);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  //FUNCIÓN PARA EDITAR UNA TAREA
  const editarTarea = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task);
      // console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  //FUNCIÓN PARA ELIMINAR UNA TAREA
  const eliminarTarea = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      console.log(res);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  return <TaskContext.Provider value={{ tasks, crearTarea, mostarTareas, verTarea, editarTarea, eliminarTarea }}>{children}</TaskContext.Provider>;
};
