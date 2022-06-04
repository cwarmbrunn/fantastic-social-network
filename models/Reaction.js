// Require Schema ONLY

const { Schema, default: mongoose } = require("mongoose");

// Require Date Format
const dateFormat = require("../utils/dateFormat");

// Require Virtuals and Getters
const opts = { toJSON: { virtuals: true, getters: true } };

// Set up the Reaction Schema
const reactionSchema = new Schema(
  {
    // We will have the following attributes for this
    // Mongoose's ObjectId data type
    // Default Value is set to a new ObjectId
    reactionId: {
      // NEED  TO CONFIRM //
      // Use Mongoose's ObjectId data type
      type: mongoose.Schema.Types.ObjectId,
      // Default value is set to a new ObjectId
      default: mongoose.Schema.Types.ObjectId,
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

// This will not be a model, rather, it will be used as the reaction
// field's subdocument schema in the Thought model
