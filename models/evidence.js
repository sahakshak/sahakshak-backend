const mongoose = require("mongoose");

const evidenceSchema = new mongoose.Schema({
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  locationFound: {
    type: String,
    required: true,
  },
  foundBy: {
    type: String,
    required: true,
  },
  foundOn: {
    type: Date,
    required: true,
  },
  collectedBy: {
    type: String,
    required: true,
  },
  collectedOn: {
    type: Date,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

const Evidence = mongoose.model("Evidence", evidenceSchema);

module.exports = Evidence;
