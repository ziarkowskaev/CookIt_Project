import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  preperation: {
    type: String,
    required: true,
  },
  images: {
    type: Image,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  ratings: {
    type: String,
    required: true,
  },
  //never store average rating
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdOn: {
    type: Date,
    required: true,
  },

});

module.exports = mongoose.model("Recipe", schema);