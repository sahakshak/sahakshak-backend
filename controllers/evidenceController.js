const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const config = require("../config/firebase.config");
const Evidence = require("../models/evidence");

//Initializing a firebase app
initializeApp(config.firebaseConfig);

const storage = getStorage();

// Create a new evidence
exports.createEvidence = async (req, res) => {
  try {
    const {
      caseId,
      type,
      description,
      locationFound,
      foundBy,
      foundOn,
      collectedBy,
      collectedOn,
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

    const newEvidence = await Evidence.create({
      caseId,
      type,
      description,
      locationFound,
      foundBy,
      foundOn,
      collectedBy,
      collectedOn,
      imageURL: downloadURL,
    });
    res.status(201).json(newEvidence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all evidence
exports.getEvidence = async (req, res) => {
  try {
    const evidence = await Evidence.find();
    res.status(200).json(evidence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get evidence by ID
exports.getEvidenceById = async (req, res) => {
  try {
    const evidence = await Evidence.findById(req.params.id);
    if (!evidence) {
      return res.status(404).json({ error: "Evidence not found" });
    }
    res.status(200).json(evidence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update evidence by ID
exports.updateEvidence = async (req, res) => {
  try {
    const evidenceId = req.params.id;
    const updatedData = req.body;
    const file = req.file; // New image file, if provided

    // Check if evidence exists
    const existingEvidence = await Evidence.findById(evidenceId);
    if (!existingEvidence) {
      return res.status(404).json({ error: "Evidence not found" });
    }

    // Update the evidence data
    let updatedEvidenceData;
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
      updatedEvidenceData = {
        ...updatedData,
        imageURL: await getDownloadURL(snapshot.ref),
      };
    } else {
      updatedEvidenceData = updatedData;
    }

    const updatedEvidence = await Evidence.findByIdAndUpdate(
      evidenceId,
      updatedEvidenceData,
      { new: true }
    );

    res.status(200).json(updatedEvidence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete evidence by ID
exports.deleteEvidence = async (req, res) => {
  try {
    const deletedEvidence = await Evidence.findByIdAndDelete(req.params.id);
    if (!deletedEvidence) {
      return res.status(404).json({ error: "Evidence not found" });
    }
    res.status(200).json({ message: "Evidence deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve evidence records by case ID
exports.getEvidenceByCaseId = async (req, res) => {
  try {
    const caseId = req.params.caseId;
    const evidence = await Evidence.find({ caseId: caseId });

    if (!evidence || evidence.length === 0) {
      return res
        .status(404)
        .json({ message: "No evidence found for the specified case ID" });
    }

    res.status(200).json(evidence);
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
