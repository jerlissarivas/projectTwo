// models/User.model.js

const {
  Schema,
  model
} = require('mongoose');

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required.'],
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