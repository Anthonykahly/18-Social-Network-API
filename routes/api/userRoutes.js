const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getAllUsers).post(createUser); 

// /api/users/:userId
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser); 

// /api/users/:userID/friends/:friendId
router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend); 

module.exports = router;
