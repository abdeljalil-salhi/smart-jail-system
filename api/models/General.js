const mongoose = require("mongoose");

const GeneralSchema = mongoose.Schema(
  {
    doorsClosed: {
      type: Boolean,
      required: true,
	  default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("General", GeneralSchema);
