const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const runRoutes = require('./routes/runs');

app.use('/auth', authRoutes);
app.use('/runs', runRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});