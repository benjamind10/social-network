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
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = userController;
