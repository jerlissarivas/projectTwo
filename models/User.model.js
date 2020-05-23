// models/User.model.js

const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    googleID: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
