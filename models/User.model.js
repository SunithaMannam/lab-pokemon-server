// models/Student.model.js

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please enter valid email ID"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },
    pokemons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pokemons",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Users", userSchema);
