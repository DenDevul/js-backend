const express = require('express');
const Todo = require('../dataBase/models/todo.model');
const router = express.Router();
const {asyncHandler} = require('../middleware/middleware')

function initRoutes() {
  router.post('/api/todos/', asyncHandler(createTodo));
  router.get('/api/todos/', asyncHandler(getTodos));
  router.get('/api/todos/:id', asyncHandler(getTodoById));
  router.patch('/api/todos/:id', asyncHandler(updateTodo));
  router.delete('/api/todos/', asyncHandler(deleteTodos));
  router.delete('/api/todos/:id', asyncHandler(deleteTodoById));
}

const createTodo = async (req, res, next) => {
  Todo.create(req.body.todo);
  res.sendStatus(201);
};

const getTodos = async (req, res, next) => {
  const todos = await Todo.findAll({
    where: {
      userId: req.body.userId
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

initRoutes()

module.exports = router
