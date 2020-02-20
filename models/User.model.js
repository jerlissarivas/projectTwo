// models/User.model.js

const {
  Schema,
  model
} = require('mongoose');

<<<<<<< HEAD
const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required.'],
=======
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    }
>>>>>>> 3453e44c271538c674c9c265b0fd3a4a7b115cd8
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'First name is required.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required.']
  }
}, {
  timestamps: true
});

module.exports = model('User', userSchema);