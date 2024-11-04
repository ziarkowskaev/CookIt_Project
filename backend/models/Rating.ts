import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
  value: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  

});

module.exports = mongoose.model("Rating", schema);