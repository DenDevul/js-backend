const express = require('express');
const router = express.Router();
const Token = require('../dataBase/models/token.model');
const User = require('../dataBase/models/user.model');
const {asyncHandler} = require('../middleware/middleware')

function initRoutes() {
  router.get('/api/users/me', asyncHandler(getUserInfo));
  router.patch('/api/users/logout', asyncHandler(updateUserInfo));
  router.post('/api/users/me', asyncHandler(logout));
}

const getUserInfo = async (req, res, next) => {
  const user = await User.findByPk(req.body.userId);
  res.status(200).json(user)
};

const updateUserInfo = async (req, res, next) => {
  const user = await User.findByPk(req.body.userId);
  if(user) {
    user = req.body.user
    await user.save()
    res.statusStatus(201)
  } else {
    res.sendStatus(500)
  }
};

const logout = async (req, res, next) => {
  await Token.destroy({where:{id: req.body.userId}})
  res.sendStatus(200)
};

initRoutes();

module.exports = router;
