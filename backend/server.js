const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// Import routes
const authRoute = require("./routes/auth");
const itemsRoute = require("./models/Items");
const addRoute = require("./routes/add"); // <-- your add-item route
const removeRoute = require('./routes/remove'); 

// Mount routes
app.use("/api/auth", authRoute);
app.use("/api/items", itemsRoute);
app.use("/api/add", addRoute);
app.use('/api/remove', removeRoute); // <-- this is important

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// Instead of this (binds to localhost only):
app.listen(5000, () => {
  console.log("Server running on port 5000");
});