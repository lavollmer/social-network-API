const { Schema, model } = require('mongoose');

//reactionSchema subdocument
const reactionSchema = new Schema({
  reactionID: { type: Schema.Types.ObjectId },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    //Array of nested documents created with the reactionSchema
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

//creating virtual 
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

//creating Model thought variable
const Thought = model('thought', thoughtSchema);


//exporting Thought Model
module.exports = Thought;

