const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the AfriGeoStat API');
});

// Mount routers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/datasets', require('./routes/datasets'));

// Require models before syncing
require('./models');

// Test the database connection and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    // Check for PostGIS extension
    return sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis;');
  })
  .then(() => {
    console.log('PostGIS extension is enabled.');
    // Sync all models with the database
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('All models were synchronized successfully.');
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to initialize the application:', err);
  });

module.exports = app;
