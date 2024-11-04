import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  recipes: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("Category", schema);