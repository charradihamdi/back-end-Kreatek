const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
//routes

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
//environment variable or you can say constants
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
