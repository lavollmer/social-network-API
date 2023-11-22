const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models');

// Aggregate function to get the number of thoughts overall
const headCount = async () => {
  const numberOfThoughts = await Thought.aggregate()
    .count('ThoughtCount');
  return numberOfThoughts;
}

module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      const thoughtObj = {
        thoughts,
        headCount: await headCount(),
      };

      res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params._id })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'This is not a thought' })
      }

      res.json({
        thought,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new thought
  async newThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update a thought
  async updateThought(req, res) {
    try {
      // find and update by ID, set (reset) the body, and new is a new version set to true
      const thought = await Thought.findOneAndUpdate({ _id: req.params._id }, { $set: req.body }, { new: true })
      res.json(thought);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  // Delete a thought and remove them the social network
  async removeThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params._id });

      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }

      res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Add a reaction
  async createReaction(req, res) {
    try {
      // finding by ID in the Thought Model
      const thought = await Thought.findById(req.params._id);
      //calling the reaction array through the thought Model
      const reaction = thought.reactions;

      //creating a newReaction based on the body information in the Thought Model
      const newReaction = {
        reactionID: req.params._id,
        reactionBody: req.body.reactionBody,
        username: req.body.username,
        createdAt: req.body.createdAt
      }

      //adding the new reaction onto the variable
      reaction.push(newReaction);

      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Delete a reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { reactionId: req.params.reactionId },
        { $pull: { reactionId: req.params.reactionId } },
        { new: true }
      );

      if (!reaction) {
        return res.status(404).json({
          message: 'No reactions found',
        });
      }

      res.json({ message: 'Reaction successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};