const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/users', userController.createUser);
router.post('/users/login', userController.loginUser);
router.get('/users/:id', userController.getUserById);
router.get('/users', userController.getAllUsers);

module.exports = router;