const express = require('express');
const route = express.Router();

const {register, login} = require('../controllers/authController');
const {getAllUsers, getUserById, updateUser, deleteUser} = require('../controllers/userController');

route.get('/users', getAllUsers);

route.get('/user/:id', getUserById);

route.post('/register', register);

route.post('/login', login);

route.patch('/user/:id', updateUser);

route.delete('/user/:id', deleteUser);

module.exports = route;
