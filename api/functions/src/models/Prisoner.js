const mongoose = require("mongoose");

const PrisonerSchema = mongoose.Schema(
  {
    prisonerID: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    cellID: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prisoner", PrisonerSchema);
