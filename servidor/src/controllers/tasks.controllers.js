import Task from "../models/task.model.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).populate("user", ["username"]);
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const taskFound = await Task.findById(req.params.id).populate("user", ["username"]);
    if (!taskFound) return res.status(404).json({ message: "Task not found" });
    res.json(taskFound);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      user: req.user.id,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const editTask = async (req, res) => {
  try {
    const taskFound = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!taskFound) return res.status(404).json({ message: "Task not found" });
    res.json(taskFound);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskFound = await Task.findByIdAndDelete(req.params.id);
    if (!taskFound) return res.status(404).json({ message: "Task not found" });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
