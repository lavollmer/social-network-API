const router = require('express').Router();

const {
  //GET all users
  getAllThoughts,
  //GET a single user by its _id and populated thought and friend data
  getSingleThought,
  //POST a new user:
  newThought,
  //PUT to update a user by its _id
  updateThought,
  //DELETE to remove Thought by its _id
  removeThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts)

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').get(getSingleThought)

// /api/thoughts/:userId
router.route('/:thoughtsId').post(newThought);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').put(updateThought);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').delete(removeThought);

module.exports = router;