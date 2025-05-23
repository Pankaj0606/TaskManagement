const Task = require('../models/task.model');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get task details by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedUserId', 'name email');
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all tasks with optional filtering and pagination
exports.getAllTasks = async (req, res) => {
  try {
    const query = {};

    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.assignedUserId) {
      query.assignedUserId = req.query.assignedUserId;
    }

    const page = parseInt(req.query.page) || 1;     // Default to page 1
    const limit = parseInt(req.query.limit) || 10;  // Default to 10 tasks per page
    const skip = (page - 1) * limit;

    const tasks = await Task.find(query)
      .populate('assignedUserId', 'name email')
      .skip(skip)
      .limit(limit);

    const total = await Task.countDocuments(query);

    res.send({
      total,
      page,
      pages: Math.ceil(total / limit),
      tasks
    });
  } catch (error) {
    res.status(500).send(error);
  }
};


// Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};