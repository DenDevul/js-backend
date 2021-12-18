const Sequelize = require('sequelize');
const { sequelize } = require('..');

class Todo extends Sequelize.Model {}

Todo.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.DataTypes.STRING,
    },
    userId: {
      type: Sequelize.DataTypes.UUID
    },
    isCompleted: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false
    },
    isFavourite: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  { sequelize: sequelize, underscored: true, modelName: 'todo' }
);

module.exports = Todo;
