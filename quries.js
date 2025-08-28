const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

// Import the model
const Todo = require("./models/todo.js");

const connect = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGODB_URI);

    // Run the queries
    await runQueries();

    // Disconnect from MongoDB
    await mongoose.disconnect();

    // End node process
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

const createTodo = async () => {
  const todo = await Todo.create({
    text: "Feed the pets",
    isComplete: false,
  });
  console.log(todo);
};

const findTodos = async () => {
  const todos = await Todo.find({});
  console.log(todos);
};

const findTodoById = async (id) => {
  const todo = await Todo.findById(id);
  console.log(todo);
};

const updateTodo = async (id, newText) => {
  const todo = await Todo.findById(id);
  todo.text = newText;
  await todo.save();
  console.log(todo);
};

const toggleTodoComplete = async (id) => {
  const todo = await Todo.findById(id);
  todo.isComplete = !todo.isComplete;
  await todo.save();
  console.log(todo);
};

const deleteTodo = async (id) => {
  const todo = await Todo.findById(id);
  const deleteResponse = await todo.deleteOne();
  console.log(deleteResponse);
}

const runQueries = async () => {
  // Create (.create())
  await createTodo();
  // Read (.find() or .findById() or .findOne())
  await findTodos();
  await findTodoById("68b0ae1d6401c812b9144ad7");
  // Update (findById() then update using .notation and then use .save())
  await updateTodo("68b0ae1d6401c812b9144ad7", "Wash the car");
  await toggleTodoComplete("68b0ae1d6401c812b9144ad7");
  // Delete
  await deleteTodo("68b0b6f01b11862e5106248d");
};

connect();
