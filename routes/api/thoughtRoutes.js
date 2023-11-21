const router = require('express').Router();

const {
  //GET all users
  getAllUsers,
  //GET a single user by its _id and populated thought and friend data
  getSingleUser,
  //POST a new user:
  newUser,
  //PUT to update a user by its _id
  updateUser,
  //DELETE to remove user by its _id
  removeUser,
} = require('../../controllers/userController');

// /api/thoughts
router.route('/').get(getAllthoughts)

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').get(getSingleUser)

// /api/thoughts/:userId
router.route('/:thoughtsId').post(newthoughts);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').put(updateUser);

// /api/thoughts/:thoughtsId/assignments
router.route('/:thoughtsId').delete(removeUser);

module.exports = router;