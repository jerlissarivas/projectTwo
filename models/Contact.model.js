const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    companyOne: {
      type: String,
      trim: true,
    },
    companyTwo: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      // when setting a default value in the schema you want to avoid giving the user the option to set the value on sign up. If they by chance do not enter a field then the default will override to be blank as well.
      default:
        "https://www.mentoring.org/new-site/wp-content/uploads/2019/05/default-user-300x300.png",
    },
    personalEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },
    workEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },
    group: {
      type: ObjectId,
      enum: [],
    },
    personalAddress: {
      type: String,
    },
    workAddress: {
      type: String,
    },
    socialProfile: {
      type: String,
      trim: true,
    },
    birthday: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Contact", contactSchema);
