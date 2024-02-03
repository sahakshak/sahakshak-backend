const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["Open", "Pending", "Closed"],
    default: "Open",
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  timeOfCrime: {
    type: Date,
  },
  suspect: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageURL: {
    type: String,
  },
});

caseSchema.statics.updateCaseDataById = async function (caseId, newData) {
  await this.findByIdAndUpdate(caseId, newData, { new: true });
};

module.exports = mongoose.model("Case", caseSchema);
