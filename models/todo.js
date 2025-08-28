const mongoose = require("mongoose");

// Define the schema (structure of the document)
const todoSchema = new mongoose.Schema({
  text: String,
  isComplete: Boolean,
});

// Create the model (JS object that has all C(reate)R(ead)U(pdate)D(elete) methods on)
const Todo = mongoose.model("Todo", todoSchema);

// Export the model
module.exports = Todo;