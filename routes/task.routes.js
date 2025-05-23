const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const auth = require('../middleware/auth');

router.post('/tasks', auth, taskController.createTask);
router.get('/tasks/:id', auth, taskController.getTaskById);
router.get('/tasks', auth, taskController.getAllTasks);
router.put('/tasks/:id', auth, taskController.updateTask);
router.delete('/tasks/:id', auth, taskController.deleteTask);

module.exports = router;