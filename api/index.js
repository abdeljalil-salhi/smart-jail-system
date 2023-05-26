const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const prisonerRoute = require("./routes/prisoners");
const alarmRoute = require("./routes/alarms");

dotenv.config();

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas, prisoners database");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB Atlas, prisoners database");
    console.log(err);
  });

app.use(express.json());

app.use("/prisoners", prisonerRoute);
app.use("/alarms", alarmRoute);

app.get("/", (req, res) => {
  res
    .status(200)
    .json("Welcome to the Prisoner Management System API. Please use /prisoners or /alarms to access the API.");
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on localhost:${process.env.PORT || 8080}`);
});
