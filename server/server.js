const mongoose = require("mongoose"); // Ensure mongoose is required
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "config.env") });
// console.log(process.env.PORt, process.env.DB_U

const app = require("./index");
// app.use(express.json({ limit: "10kb" }));
const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URL).then(() => {
      console.log("DB connection successful");
    });

    const server = app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });

    module.exports = server;
  } catch (err) {
    console.error("Failed to connect to the database", err);
    process.exit(1); // Exit the process with failure
  }
};

startServer();
