const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'backend',
  username: 'kekwait',
  password: 'aboba'
});

const initDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Sequelize was initialized');
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = {
  sequelize,
  initDB
};
