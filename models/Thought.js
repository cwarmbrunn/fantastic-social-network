// Require Schema and Model
const { Schema, model } = require("mongoose");

// Require Virtuals and Getters
const opts = { toJSON: { virtuals: true, getters: true } };

// Require Date Format
const dateFormat = require("../utils/dateFormat");

// Set up the Reaction Schema
const reactionSchema = new Schema(
  {
    // We will have the following attributes for this
    // Mongoose's ObjectId data type
    // Default Value is set to a new ObjectId
    reactionId: {
      // NEED  TO CONFIRM //
      // Use Mongoose's ObjectId data type
      type: Schema.Types.ObjectId,
      // Default value is set to a new ObjectId
      default: () => new Types.ObjectId(),
      // END CONFIRM //
    },
    // We will have the following attributes for this
    // String, Required, Maximum Length of 280 characters
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    // We will have the following attributes for this
    // String, Required
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // TODO: Use a getter method to format the timestamp on query
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  opts
);

// Set up the Thought Schema
const ThoughtSchema = new Schema(
  {
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
    reactions: [reactionSchema],
    // TODO: Array of nested documents created with the reactionSchema
  },
  opts
);

// CREATE A VIRTUAL
// reactionCount that retrieves the length of the thought's reactions array field on query
ThoughtSchema.virtual("reactionCount").get(function () {
  // Return the length of the reaction array field on query
  return this.reactions?.length;
});
const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
