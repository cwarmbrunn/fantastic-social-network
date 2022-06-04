// Require Schema and Model
const { Schema, model } = require("mongoose");

// Set up the Thought Schema
const ThoughtSchema = new Schema({
  // We will have the following attributes for this
  // ATTRIBUTES: String, Required, Must be between 1 and 280 characters
  thoughtText: {
    // We want the type to be a String
    type: String,
    // We want a requirement message
    required: "Please input thought text!",

    // NEED TO CONFIRM //
    // At least 1 character
    minlength: 1,
    // At most 280 characters
    maxlength: 280,
    // END CONFIRM //
  },
  // ATTRIBUTES: Date, Default Value, Getter Method
  createdAt: {
    type: Date,
    default: Date.now,
    // Use a getter method to format timestamp on query
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
  // ATTRIBUTES: String, Required
  username: {
    // We want the type to be String
    type: String,

    // We want a requirement message
    required: "Please provide a username!",
  },
  reactions: {
    // TODO: Array of nested documents created with the reactionSchema
  },
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
