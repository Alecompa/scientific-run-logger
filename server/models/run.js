const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Run = sequelize.define('run', {
        run_number: Sequelize.INTEGER,
        start_time: Sequelize.DATE,
        run_type: Sequelize.STRING,
        scan_number: Sequelize.INTEGER,
        charge: Sequelize.STRING,
        roi: Sequelize.STRING,
        isit_trash: Sequelize.BOOLEAN,
        notes: Sequelize.STRING
    });
    return Run;
};
