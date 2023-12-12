import Task from "../models/task.model.js";

export const getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

export const getTaskById = async (req, res) => {
  const taskFound = await Task.findById(req.params.id);
  if (!taskFound) return res.status(404).json({ message: "Task not found" });
  res.json(taskFound);
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({
    title,
    description,
  });
  const savedTask = await newTask.save();
  res.json(savedTask);
};

export const editTask = async (req, res) => {
  res.send("All tasks");
};

export const deleteTask = async (req, res) => {
  const taskFound = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!taskFound) return res.status(404).json({ message: "Task not found" });
  res.json(taskFound);
};
