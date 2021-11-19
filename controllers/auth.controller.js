const express = require('express');
const Token = require('../dataBase/models/token.model');
const router = express.Router();
const User = require('../dataBase/models/user.model');
const { nanoid } = require('nanoid');

function initRoutes() {
  router.post('/api/auth/registration', register);
  router.post('/api/auth/login', login);
}

const register = async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.user.email } });
  if (!user) {
    await User.create(req.body.user);
    res.sendStatus(201);
  } else {
    res.status(400).send('This email is already in use');
  }
};

const login = async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.user.email } });
  if (user) {
    if (user.password === req.body.user.password) {
      const [token, created] = await Token.findOrCreate({
        where: { userId: user.id },
        defaults: {
          userId: user.id,
          value: nanoid()
        }
      });
      res.status(200).json({ accessToken: token.value });
    } else {
      res.status(400).send('Wrong password');
    }
  } else {
    res.status(404).send('No user with this email');
  }
};

initRoutes();

module.exports = router;
