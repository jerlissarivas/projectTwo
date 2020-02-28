// models/User.model.js

const mongoose = require("mongoose");


const {
  Schema,
  model
} = require('mongoose');

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    // required: [true, 'Last name is required.']
  },
  email: {
    type: String,
    // required: [true, 'Email is required.'],
    lowercase: true,
    trim: true
  },
  googleID: {
    type: String
  },
  password: {
    type: String,
    // required: [true, 'Password is required.']
  }
}, {
  timestamps: true
});

module.exports = model('User', userSchema);