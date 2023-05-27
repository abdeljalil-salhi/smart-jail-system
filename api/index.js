const express = require("express");
const http = require("http");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const prisonerRoute = require("./routes/prisoners");
const alarmRoute = require("./routes/alarms");

const hostname = process.env.HOSTNAME || "localhost";

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

app.use(cors());
app.use(express.json());

app.use("/prisoners", prisonerRoute);
app.use("/alarms", alarmRoute);

app.get("/", (req, res) => {
  res
    .status(200)
    .json(
      "Welcome to the Prisoner Management System API. Please use /prisoners or /alarms to access the API."
    );
});

const server = http.createServer(app);

server.listen(process.env.PORT || 8080, hostname, () => {
  console.log(`Server is running on ${hostname}:${process.env.PORT || 8080}`);
});
