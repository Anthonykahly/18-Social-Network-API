const { Schema, model } = require("mongoose");

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
      match: [/.+@.+\..+/],
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

UsersSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const Users = model("Users", UsersSchema);

module.exports = Users;
