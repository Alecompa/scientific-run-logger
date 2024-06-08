const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'
});

const Run = require('./run')(sequelize);
const User = require('./user')(sequelize);

module.exports = { sequelize, Run, User };