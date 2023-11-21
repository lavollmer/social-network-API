const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trimmed: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      validate: function (validateEmail) {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(validateEmail);
      }
    },
    //Array of _id values referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      }
    ],
    //Array of _id values referencing the User model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

//creating virtual friendCount - returns the length of the friends array
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

//creating Model User variable
const User = model('user', userSchema);

//exporting User Model
module.exports = User;
