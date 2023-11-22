const express = require('express');
const db = require('./config/connection.js');

// Require models
const { Thought, User } = require('./models');
const routes = require('./routes');

//listening on PORT 3002
const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//running database on server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
