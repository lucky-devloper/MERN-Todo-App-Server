const express = require("express");
const Todo = require('./todo');

const router = express.Router();

// Create a new Todo
router.post("/todos", async (req, res) => {
    const { title } = req.body;
    try {
        const newTodo = new Todo({ title });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all Todos
router.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a Todo
router.put("/todos/:id", async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const { title, completed } = req.body;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, { title, completed }, { new: true });
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete a Todo
router.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
