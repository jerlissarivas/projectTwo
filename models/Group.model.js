const mongoose = require("mongoose");


const {
  Schema,
  model
} = require('mongoose');

const groupSchema = new Schema({
  groupName: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true
});

module.exports = model('Group', groupSchema);