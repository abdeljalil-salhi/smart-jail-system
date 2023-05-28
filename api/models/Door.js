const mongoose = require("mongoose");

const DoorSchema = mongoose.Schema(
  {
    isClosed: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Door", DoorSchema);
