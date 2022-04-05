// Imports & Dependencies
const { Thought, User } = require('../models');

// Constructs the thought controller
const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => {
        console.log(dbThoughtData);
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create a thought
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get a thought by ID
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .then(dbThoughtData => {
        !dbThoughtData
          ? res
              .status(404)
              .json({ message: 'No thought found with that id.' })
          : res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then(dbThoughtData => {
        !dbThoughtData
          ? res
              .status(404)
              .json({ message: 'No thought found with that id.' })
          : res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        !dbThoughtData
          ? res
              .status(404)
              .json({ message: 'No thought found with that id.' })
          : res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      {
        new: true,
        runValidators: true,
      }
    )
      .then(dbReactionData => {
        !dbReactionData
          ? res
              .status(404)
              .json({ message: 'No reaction found with that id.' })
          : res.json(dbReactionData);
      })
      .catch(err => res.json(err));
  },

  // delete reaciton
  deleteReaction({ params, body }, res) {
    console.log(body);
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: body.reactionId } } },
      { new: true }
    )
      .then(dbReactionData => res.json(dbReactionData))
      .catch(err => res.json(err));
  },
};

module.exports = thoughtController;
