const express = require('express');
const http = require('http');
const cors = require('cors');
const authRouter = require('./controllers/auth.controller');
const todoRouter = require('./controllers/todo.controller');
const userRouter = require('./controllers/user.controller');
const { initDB } = require('./dataBase');
const { notFound, errorHandler } = require('./middleware/middleware');

const app = express();

// initDB()

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log('URL = ', req.url);
  console.log('Original_URL = ', req.originalUrl);
  console.log('METHOD = ', req.method);
  console.log('HOST = ', req.headers.host);
  console.log('IsSecure = ', req.secure);
  console.log('BODY', req.body);
  console.log('QUERY', req.query);

  next();
});

app.use(authRouter);
app.use(todoRouter);
app.use(userRouter);

app.use(notFound);
app.use(errorHandler);

http.createServer(app).listen(3000, () => {
  console.log('Server is working on port 3000');
});
