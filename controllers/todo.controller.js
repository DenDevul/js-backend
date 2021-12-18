const express = require('express');
const Todo = require('../dataBase/models/todo.model');
const Token = require('../dataBase/models/token.model');
const router = express.Router();
const { asyncHandler, requireToken } = require('../middleware/middleware');

function initRoutes() {
  router.post(
    '/api/todos/',
    asyncHandler(requireToken),
    asyncHandler(createTodo)
  );
  router.get('/api/todos/', asyncHandler(requireToken), asyncHandler(getTodos));
  router.get(
    '/api/todos/:id',
    asyncHandler(requireToken),
    asyncHandler(getTodoById)
  );
  router.patch(
    '/api/todos/:id',
    asyncHandler(requireToken),
    asyncHandler(updateTodo)
  );
  router.delete(
    '/api/todos/',
    asyncHandler(requireToken),
    asyncHandler(deleteTodos)
  );
  router.delete(
    '/api/todos/:id',
    asyncHandler(requireToken),
    asyncHandler(deleteTodoById)
  );
}

const createTodo = async (req, res, next) => {
  const userToken = req.headers['x-access-token'];
  const { userId } = await Token.findOne({ where: { value: userToken } });
  req.body.userId = userId;
  Todo.create(req.body);
  res.sendStatus(201);
};

const getTodos = async (req, res, next) => {
  const userToken = req.headers['x-access-token'];
  const { userId } = await Token.findOne({ where: { value: userToken } });
  const todos = await Todo.findAll({
    where: {
      userId: userId
    }
  });
  res.status(200).json(todos);
};

const getTodoById = async (req, res, next) => {
  const todo = await Todo.findByPk(req.params.id);
  res.status(200).json(todo);
};

const updateTodo = async (req, res, next) => {
  res.sendStatus(200);
};

const deleteTodos = async (req, res, next) => {
  await Todo.destroy({
    where: {
      userId: req.body.userId
    }
  });
  res.sendStatus(200);
};

const deleteTodoById = async (req, res, next) => {
  await Todo.destroy({
    where: {
      id: req.params.id
    }
  });
  res.sendStatus(200);
};

initRoutes();

module.exports = router;
