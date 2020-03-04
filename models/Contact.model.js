const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

const {
  Schema,
  model
} = require('mongoose');

const contactSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    // required: [true, 'First name is required.'],
  },
  lastName: {
    type: String,
    trim: true,
    // required: [true, 'First name is required.'],
  },
  companyOne: {
    type: String,
    trim: true
  },
  companyTwo: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    // when setting a default value in the schema you want to avoid giving the user the option to set the value on sign up. If they by chance do not enter a field then the default will override to be blank as well.
    default: "https://www.mentoring.org/new-site/wp-content/uploads/2019/05/default-user-300x300.png"
  },
  personalEmail: {
    type: String,
    // required: [true, 'Email is required.'],
    // unique: true,
    lowercase: true,
    trim: true
  },
  workEmail: {
    type: String,
    // required: [true, 'Email is required.'],
    // unique: true,
    lowercase: true,
    trim: true
  },
  group: {
    // type: String,
    type: ObjectId,
    enum: []
  },
  personalAddress: {
    type: String,
    // required: [true, 'Email is required.'],
    // unique: true,
  },
  workAddress: {
    type: String,
    // required: [true, 'Email is required.'],
    // unique: true,
  },
  socialProfile: {
    type: String,
    // unique: true,
    trim: true
  },
  birthday: {
    type: Date,
  },
  notes: {
    type: String,
  }
}, {
  timestamps: true
});

module.exports = model('Contact', contactSchema);