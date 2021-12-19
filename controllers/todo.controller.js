const express = require('express');
const Todo = require('../dataBase/models/todo.model');
const router = express.Router();
const { asyncHandler, requireToken } = require('../middleware/middleware');

function initRoutes() {
  router.post(
    '/api/todos/',
    asyncHandler(requireToken),
    asyncHandler(createTodo)
  );
  router.get(
    '/api/todos/', 
    asyncHandler(requireToken), 
    asyncHandler(getTodos));
  router.patch(
    '/api/todos/',
    asyncHandler(requireToken),
    asyncHandler(updateTodo)
  );
  router.delete(
    '/api/todos/',
    asyncHandler(requireToken),
    asyncHandler(deleteTodoById)
  );
}

const createTodo = async (req, res, next) => {
  req.body.todo.userId = req.body.userId;
  await Todo.create(req.body.todo);
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

const updateTodo = async (req, res, next) => {
  try {
    await Todo.update(req.body.todo, {
      where: { id: req.query.id, userId: req.body.userId }
    });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteTodoById = async (req, res, next) => {
  await Todo.destroy({
    where: {
      id: req.query.id,
      userId: req.body.userId
    }
  });
  res.sendStatus(200);
};

initRoutes();

module.exports = router;
