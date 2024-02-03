const mongoose = require("mongoose");

const criminalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },

  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case",
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  crime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Wanted", "Arrested", "Released"],
    default: "Wanted",
  },
  imageURL: {
    type: String,
  },
});

const Criminal = mongoose.model("Criminal", criminalSchema);

module.exports = Criminal;
