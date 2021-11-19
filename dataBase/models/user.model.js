const Sequelize = require('sequelize');
const { sequelize } = require('..');
const Todo = require('./todo.model');
const Token = require('./token.model');

class User extends Sequelize.Model {}

User.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4
    },
    login: {
      type: Sequelize.DataTypes.STRING
    },
    password: {
      type: Sequelize.DataTypes.STRING
    },
    email: {
      type: Sequelize.DataTypes.STRING
    },
    name: {
      type: Sequelize.DataTypes.STRING
    }
  },
  { sequelize: sequelize, underscored: true, modelName: 'user' }
);

User.hasMany(Todo)
User.hasMany(Token)

Todo.belongsTo(User);
Token.belongsTo(User)

module.exports = User;
