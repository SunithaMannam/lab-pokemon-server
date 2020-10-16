// /models/Session.model.js

const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const sessionSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: "Users",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    index: { expires: 10 * 60 * 10 }, // milli seconds
  },
});

module.exports = model("Session", sessionSchema);
