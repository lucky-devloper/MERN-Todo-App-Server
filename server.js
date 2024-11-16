const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const todoRoutes = require('./todoRoutes');

// Set up CORS middleware first
app.use(cors({
  origin: 'https://mern-todo-client-side.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));

// Use bodyParser before defining routes
app.use(bodyParser.json());

// Define routes after setting up middleware
app.use("/api", todoRoutes);

const mongooseURL = 'mongodb+srv://Pritam:motaji2233@cluster0.3ux1j.mongodb.net/'
mongoose.connect(mongooseURL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log("MongoDB connected");
});
db.on('error', (err) => {
    console.error("MongoDB error", err);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
