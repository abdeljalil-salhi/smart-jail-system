const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const prisonerRoute = require("./routes/prisoners");
const alarmRoute = require("./routes/alarms");
const doorRoute = require("./routes/doors");

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
app.use("/doors", doorRoute);

app.get("/", (req, res) => {
  res
    .status(200)
    .json(
      "Welcome to the Prisoner Management System API. Please use /prisoners or /alarms to access the API."
    );
});

if (process.env.NODE_ENV === "production") {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`);
  });
} else {
  const http = require("http");
  const server = http.createServer(app);
  server.listen(process.env.PORT || 8080, process.env.HOSTNAME, () => {
    console.log(
      `Server is running on ${process.env.HOSTNAME}:${process.env.PORT || 8080}`
    );
  });
}
