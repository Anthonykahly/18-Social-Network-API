const req = require("express/lib/request");
const { Thought, User } = require("../models");

const usersController = {
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((user) => {
        !user ? res.status(404).json({ message: "No user" }) : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user contains that ID" })
          : Thought.deleteMany({
              _id: {
                $in: user.thoughts,
              },
            })
      )
      .then(() => res.json({ message: "User deleted" }))
      .catch((err) => res.status(500).json(err));
  },

  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user contains this ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    console.log("New friend added");
    console.log(req.body);
    User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $addToSet: {
          friends: req.params.friendsId,
        },
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No friend contains that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $pull: {
          friends: req.params.friendsId,
        },
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No friend contains that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = usersController;
