const { Users, Thought } = require("../models");

const usersController = {
  getAllUsers(req, res) {
    Users.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  getUsersById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUsersData) => {
        if (!dbUsersData) {
          return res
            .status(404)
            .json({ message: "No users found with this id!" });
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  createUsers({ body }, res) {
    Users.create(body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.json(err));
  },
  updateUsers({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No users found with this id!" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },
  deleteUsers({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          return res.status(404).json({ message: "No users with this id!" });
        }
        return Thought.deleteMany({ _id: { $in: dbUsersData.thoughts } });
      })
      .then(() => {
        res.json({ message: "Users and associated thoughts deleted!" });
      })
      .catch((err) => res.json(err));
  },
  addFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.usersId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: "No users with this id" });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },
  removeFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.usersId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          return res.status(404).json({ message: "No users with this id!" });
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },
};
module.exports = usersController;
