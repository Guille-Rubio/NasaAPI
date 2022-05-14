const express = require('express');
const userRouter = express.Router();
const users = require('../controllers/users')


userRouter.post('/users/signup', users.signUpUser);

userRouter.post('/users/login', users.logInUser);
userRouter.get('/users/logout', );
userRouter.delete('/users/closeaccount', );

module.exports = userRouter