// const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

// Aggregate function to get the number of users overall
const headCount = async () => {
  const numberOfUsers = await User.aggregate()
    .count('UserCount');
  return numberOfUsers;
}

module.exports = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
        headCount: await headCount(),
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ id: req.params._id })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'This is not a user' })
      }

      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async newUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update a user
  async updateUser(req, res) {
    try {
      // find and update by ID, set (reset) the body, and new is a new version set to true
      const user = await User.findOneAndUpdate({ _id: req.params._id }, { $set: req.body }, { new: true })
      res.json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  // Delete a user and remove them the social network
  async removeUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params._id });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      const reaction = await User.findOneAndUpdate(
        { users: req.params.userId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );

      if (!reaction) {
        return res.status(404).json({
          message: 'User deleted, but no reactions found',
        });
      }

      res.json({ message: 'Student successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // create a new friend
  async addNewFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);

      if (!user || !friend) {
        return res.status(404).json({ error: "User or friend does not exist" });
      }

      user.friends.push(friendId);

      await user.save();

      res.status(200).json({ response: "Friend successfully added" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a friend and remove them the social network
  async removeNewFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params._id },
        { $pull: { friends: req.params._id } },
        { new: true }
      );

      if (!friend) {
        return res.status(404).json({
          message: 'No friends found',
        });
      }

      res.json({ message: 'Friend successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};