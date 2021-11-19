const Sequelize = require('sequelize');
const { sequelize } = require('..');

class Todo extends Sequelize.Model {}

Todo.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4
    },
    title: {
      type: Sequelize.DataTypes.STRING,
      defaultValue: 'Title'
    },
    userId: {
      type: Sequelize.DataTypes.UUID
    },
    description: {
      type: Sequelize.DataTypes.STRING
    },
    isCompleted: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false
    },
    isFavourite: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false
    },
    priority: {
      type: Sequelize.DataTypes.SMALLINT,
      defaultValue: 5
    }
  },
  { sequelize: sequelize, underscored: true, modelName: 'todo' }
);

module.exports = Todo;
