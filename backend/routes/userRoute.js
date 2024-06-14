const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/auth');

const userRoute = express.Router();
const userController = new UserController();

userRoute.post('/register', userController.register);
userRoute.post('/login', userController.login);
userRoute.post('/logout', userController.logout);
userRoute.get('/verify', authMiddleware, userController.verify);
userRoute.post('/savesettings', authMiddleware, userController.saveSettings);
userRoute.post('/favorite', authMiddleware, userController.addAndDeleteFavorite);
userRoute.get('/favorites', authMiddleware, userController.getFavorites);

module.exports = userRoute;
