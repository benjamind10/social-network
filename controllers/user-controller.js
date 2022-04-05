const { User, Thought } = require('../models');

const userController = {
  // Display all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
        strictPopulate: false,
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => {
        console.log(dbUserData);
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Creates a user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Searches for user by ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
        strictPopulate: false,
      })
      .select('-__v')
      .then(dbUserData => {
        !dbUserData
          ? res
              .status(404)
              .json({ message: 'No user found with that id.' })
          : res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Updates a user info
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then(dbUserData => {
        !dbUserData
          ? res
              .status(404)
              .json({ message: 'No user found with that id.' })
          : res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
};

module.exports = userController;
