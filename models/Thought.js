const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

//creating a student model schema
const ReactionsSchema = new Schema(
  {
    ReactionsId: {
      type: Schema.Types.ObjectId,

      default: () => new Types.ObjectId(),
    },
    ReactionsBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const ThoughtsSchema = new Schema(
  {
    ThoughtsText: {
      type: String,
      required: "Thoughts Required",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    Reactions: [ReactionsSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Reference Activity 21
ThoughtsSchema.virtual("ReactionsCount").get(function () {
  return this.Reactions.length;
});

const Thoughts = model("Thoughts", ThoughtsSchema);

module.exports = Thoughts;
