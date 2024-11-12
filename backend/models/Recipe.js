const mongoose = require("mongoose");

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
  ingredients: [{
    type: String,
    required: true,
  }],
  preparation: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  tags: [{
    type: String,
    required: true,
  }],
  ratings: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Rating"
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdOn: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Recipe", schema);
