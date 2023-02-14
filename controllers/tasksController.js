const Task = require("../models/Task");
const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res, next) => {
  const allTasks = await Task.find({}).exec();
  if (!allTasks) {
    return next(createCustomError("No employeees found in database", 404));
    // return res.status(500).json({ message: "No employeees found in database" });
  }

  res.json(allTasks);
});

const createTask = asyncWrapper(async (req, res, next) => {
  const task = req.body.task;
  if (!task.name) {
    return res.status(404).json({ message: "Task must have a name" });
  }

  // checking for duplicay before proceeding to dave the task in database
  const duplicate = await Task.findOne({ name: task.name }).exec();
  // console.log(duplicate)
  if (duplicate) {
    const error = new Error("Task already exists");
    error.status = 200;
    return next(error);
    // return res.status(200).json({ message: "Task already exists" });
  }

  const result = await Task.create({ ...task });
  res.status(201).json({ task: "created", success: true, name: result.name });
});

const getTask = asyncWrapper(async (req, res) => {
  const foundTask = await Task.findOne({ _id: req.params.id }).exec();
  if (!foundTask) {
    return res
      .status(400)
      .json({ message: `task with ID ${req.params.id} does not exist` });
  }

  // console.log(foundTask)
  res.status(201).json(foundTask);
});

const updateTask = asyncWrapper(async (req, res, next) => {
  let foundTask = await Task.findOne({ _id: req.params.id }).exec();
  if (!foundTask) {
    return res
      .status(400)
      .json({ message: `task with ID ${req.params.id} does not exist` });
  }

  const newTaskDetail = req.body.task;
  if (!newTaskDetail || !newTaskDetail.name) {
    return res
      .status(401)
      .json({ message: `Provide either name or completed valuest to update.` });
  }
  // checking for duplicay before proceeding to dave the task in database
  // const duplicate = await Task.findOne({ name: newTaskDetail.name }).exec();
  // console.log(2, duplicate)
  // if (duplicate.name!==newTaskDetail.name) {
  //   return res.status(200).json({ message: `Task with ID ${req.params.id}does not have same name` });
  // }

  if (newTaskDetail.name) foundTask.name = newTaskDetail.name;
  if (typeof newTaskDetail.completed === "boolean")
    foundTask.completed = newTaskDetail.completed;
  const result = await foundTask.save();
  // console.log(result);
  res.status(201).json({ task: "updated", success: true, task: foundTask });
});

const deleteTask = asyncWrapper(async (req, res) => {
  // checking f id length is as per mongoose
  // later we can add an error Middleware in app.js to handle all error and resirect to error page
  const taskId = req.params.id;
  if (taskId.length !== 24) {
    return res.status(400).json({
      message: `Did not requested with 12 letter ID ${req.params.id}`,
    });
  }

  const foundTask = await Task.findOne({ _id: taskId }).exec();
  if (!foundTask) {
    return res
      .status(400)
      .json({ message: `task with ID ${req.params.id} does not exist` });
  }

  const result = await Task.deleteOne({ _id: taskId });
  // console.log(result)
  res.status(201).json({ task: "deleted", success: true, id: foundTask._id });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
