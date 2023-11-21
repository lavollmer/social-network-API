const express = require('express');
const db = require('./config/connection.js');
// Require model
const { Thought, User } = require('./models');
const routes = require('./routes');

const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Finds all users
// app.get('/all-users', async (req, res) => {
//   try {
//     // Using model in route to find all documents that are instances of that model
//     const result = await User.find({});
//     res.status(200).send(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err);
//   }
// });

//running database on server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
