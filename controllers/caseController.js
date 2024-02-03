const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const config = require("../config/firebase.config");
const Case = require("../models/case");

//Initializing a firebase app
initializeApp(config.firebaseConfig);

const storage = getStorage();

exports.createCase = async (req, res) => {
  try {
    const {
      title,
      description,
      name,
      gender,
      age,
      location,
      address,
      pinCode,
      phoneNumber,
      email,
      timeOfCrime,
      suspect,
    } = req.body;

    const file = req.file;

    const dateTime = giveCurrentDateTime();

    const storageRef = ref(
      storage,
      `files/${file.originalname + "-" + dateTime}`
    );
    const metadata = {
      contentType: file.mimetype,
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);

    const newCase = await Case.create({
      title,
      description,
      name,
      gender,
      age,
      location,
      address,
      pinCode,
      phoneNumber,
      email,
      timeOfCrime,
      suspect,
      imageURL: downloadURL,
    });

    res.status(201).json({ message: "Case registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCases = async (req, res) => {
  try {
    const cases = await Case.find();
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCaseById = async (req, res) => {
  try {
    const caseId = req.params.id;

    const singleCase = await Case.findById(caseId);

    if (!singleCase) {
      return res.status(404).json({ error: "Case not found" });
    }

    res.status(200).json(singleCase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCasesByPhoneNumber = async (req, res) => {
  try {
    const phoneNumber = req.params.phoneNumber;

    const cases = await Case.find({ phoneNumber });

    if (!cases || cases.length === 0) {
      return res
        .status(404)
        .json({ error: "No cases found for the provided phone number" });
    }

    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCaseById = async (req, res) => {
  try {
    const caseId = req.params.id;

    // Check if case exists
    const existingCase = await Case.findById(caseId);
    if (!existingCase) {
      return res.status(404).json({ error: "Case not found" });
    }

    // Delete the case
    await Case.findByIdAndDelete(caseId);

    res.status(200).json({ message: "Case deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCaseData = async (req, res) => {
  try {
    const caseId = req.params.id;
    const updatedData = req.body;
    const file = req.file;

    const existingCase = await Case.findById(caseId);
    if (!existingCase) {
      return res.status(404).json({ error: "Case not found" });
    }
    let updatedCaseData;
    if (file) {
      const dateTime = giveCurrentDateTime();
      const storageRef = ref(
        storage,
        `files/${file.originalname + "-" + dateTime}`
      );
      const metadata = {
        contentType: file.mimetype,
      };
      const snapshot = await uploadBytesResumable(
        storageRef,
        file.buffer,
        metadata
      );
      updatedCaseData = {
        ...updatedData,
        imageURL: await getDownloadURL(snapshot.ref),
      };
    } else {
      updatedCaseData = updatedData;
    }

    await Case.findByIdAndUpdate(caseId, updatedCaseData, { new: true });

    res.status(200).json({ message: "Case data updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};
