const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const todoRoutes = require('./todoRoutes');

app.use("/api", todoRoutes);
app.use(cors());
app.use(bodyParser.json());

const mongooseURL = 'mongodb://127.0.0.1:27017/todoApp'
mongoose.connect(mongooseURL)

const db = mongoose.connection;

db.on('connected', () => {
    console.log("MongoDB connected")
})
db.on('error', (err) => {
    console.error("MongoDB error", err)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

