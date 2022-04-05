// Imports & Dependencies
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Constructs the Reaction Schema
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      require: true,
      max: 280,
    },
    username: {
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Constructs the Thought schema
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      require: 'Please enter a thought!',
      min: 1,
      max: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      require: 'Enter a name please.',
    },
    userId: {
      type: String,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total thoughts
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// create the user model using userSchema
const Thought = model('Thought', ThoughtSchema);

// export the model
module.exports = Thought;
