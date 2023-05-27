const mongoose = require("mongoose");

const AlarmSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    prisonerID: {
      type: String,
      required: true,
    },
    alarmType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alarm", AlarmSchema);
