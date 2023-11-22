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
  //add new friend
  addNewFriend,
  //remove new friend
  removeNewFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers)

// /api/users/:userId
router.route('/:userId').get(getSingleUser)

// /api/users/:userId
router.route('/').post(newUser);

// /api/users/:userId
router.route('/:userId').put(updateUser);

// /api/users/:userId
router.route('/:userId').delete(removeUser);

///api/users /: userId / friends /: friendId
// router.route('/:userId/friends/:friendId').delete(removeNewFriend).post(addNewFriend);

// ///api/users /: userId / friends /: friendId
// router.route('/:userId').get(friends).post(removeNewFriend);

module.exports = router;