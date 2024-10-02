const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDatabase = require("./config/connectDatabase");

// Environment Variables Configuration
dotenv.config({
  path: path.join(__dirname, ".env"),
});

const app = express();
const products = require("./routes/product");
const orders = require("./routes/order");
const cors = require("cors");
// Connect to Database
connectDatabase();


// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/", products);
app.use("/api/v1/", orders);

app.use("*", (req, res, next) => {
  res.status(404).json("Page not Found");
});


// Server
app.listen(process.env.PORT, () => {
  console.log(
    `Server listening to Port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
