// Require Schema and Model
const { Schema, model } = require("mongoose");

// Set up the User Schema
const UserSchema = new Schema({
  // We will have the following attributes for this
  // String, Unique, Required, Trimmed

  username: {
    // We want the type to be a String
    type: String,
    // We want this to be a unique username - one that isn't in the database
    unique: true,
    // We want this to be trimmed
    trim: true,
    // We want a requirement message
    required: "Please input a username!",
  },
  // String, Required, Unique, Must Match a Valid Email (Mongoose Matching Validation)
  email: {
    // We want the type to be a String
    type: String,
    // We want a requirement message
    required: "Please input a valid email address!",
    // We want this to be a unique email
    unique: true,
    // Must Match a Valid Email
    match: [/.+\@.+\..+/, "Please input a valid email address!"],
  },
  thoughts: {
      // Needs to show an array of _id values referencing the Thought model

  },

  friends: {
      // Needs of _id values referencing the User model (self-reference)
  }

  // CREATE A VIRTUAL
  // friendCount that retrieves the length of the user's friends array field on query
});
