require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

// Connecting to the MongoDB
connectDB();

// Express and Third-party middlewares
// app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.json()); // to parse JSON send with JS or as JSON. Polpulate the req.body
app.use(express.urlencoded()); // to parse url-encoded-form-data
app.use(cookieParser()); // Parses cookies and populates req.cookies

// Routes
app.use("/api/v1/tasks", require("./routes/tasks"));

// Resiurce Not Found
app.use("*", require("./middlewares/not-found"));

// Error Handler middleware
app.use(require("./middlewares/errorHandler"));

mongoose.connection.once("open", () => {
  console.log("Connected to Database");
  app.listen(PORT, () => console.log("Express, started at port " + PORT));
});
