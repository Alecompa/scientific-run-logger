const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Run = sequelize.define('run', {
        run_number: Sequelize.INTEGER,
        notes: Sequelize.STRING,
        start_time: Sequelize.DATE,
        run_type: Sequelize.STRING
    });
    return Run;
};