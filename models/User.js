const { Schema, model } = require("mongoose");

// create Student model
const UsersSchema = new Schema(
  {
    usersname: {
      type: String,
      unique: true,
      trim: true,
      required: "Usersname is Required",
    },
    email: {
      type: String,
      unique: true,
      required: "Usersname is Required",
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please enter a valid email address."]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//refer to activity 21 if lost
UsersSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const Users = model("Users", UsersSchema);

module.exports = Users;
