const express = require('express');
const router = express.Router();
const Token = require('../dataBase/models/token.model');
const User = require('../dataBase/models/user.model');
const {asyncHandler, requireToken} = require('../middleware/middleware')

function initRoutes() {
  router.get('/api/users/me', asyncHandler(requireToken), asyncHandler(getUserInfo));
  router.patch('/api/users/me', asyncHandler(requireToken), asyncHandler(updateUserInfo));
  router.post('/api/users/logout', asyncHandler(requireToken), asyncHandler(logout));
}

const getUserInfo = async (req, res, next) => {
  const user = await User.findByPk(req.body.userId);
  if(user) {
    res.status(200).json(user)
  } else {
    res.sendStatus(500)
  }
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
  try {
    await Token.destroy({where:{id: req.body.userId}})
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
};

initRoutes();

module.exports = router;
