const { Schema, model } = require('mongoose');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 1,
      minlength: 280,
    },
    createdAt: {
      date: ,
      default: timestamp,
    },
    username: {
      type: String,
      required: true,
    },
    //Array of nested documents created with the reactionSchema
    reactions: {

    }
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//creating virtual 
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

//creating Model  thought variable
const Thought = model('thought', thoughtSchema);

//exporting Thought Model
module.exports = Thought;
