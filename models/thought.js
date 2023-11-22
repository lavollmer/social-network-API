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
      //Use a getter method to format the timestamp on query
      //function pick NAME and timestamp is parameter
      // get: (timestamp) => format.date(timestamp),
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

//Thought Model to create new instance including subdocument
const reactionData = [
  {
    reactionID: '655d6d427bac3b72067c00d6',
    reactionBody: 'Wow thats interesting',
    username: 'willow123',
    createdAt: '11/21/23'
  }
]

//creating data in Thought Model
Thought
  .create({ thoughtText: "I really love playing catch", createdAt: "11/20/23", username: "picasso", reactions: reactionData })
  .then(data => console.log(data))
  .catch(err => console.error(err));

//exporting Thought Model
module.exports = Thought;

