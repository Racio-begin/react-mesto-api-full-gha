const usersRouter = require('express').Router();

const {
  getUserJoiValidation,
  updateUserAvatarJoiValidation,
  updateUserInfoJoiValidation,
} = require('../middlewares/JoiValidator');

const {
  getAllUsers,
  getUserInfo,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getUserInfo);
usersRouter.get('/:userId', getUserJoiValidation, getUser);
usersRouter.patch('/me', updateUserInfoJoiValidation, updateUser);
usersRouter.patch('/me/avatar', updateUserAvatarJoiValidation, updateAvatar);

module.exports = usersRouter;
