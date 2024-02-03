const express = require("express");
const router = express.Router();
const multer = require("multer");
const criminalController = require("../controllers/criminalController");

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

// Create a new criminal
router.post(
  "/criminals",
  upload.single("image"),
  criminalController.createCriminal
);

// Get all criminals
router.get("/criminals", criminalController.getCriminals);

// Get a single criminal by ID
router.get("/criminals/:id", criminalController.getCriminalById);

// Update a criminal by ID
router.put(
  "/criminals/:id",
  upload.single("image"),
  criminalController.updateCriminal
);

// Delete a criminal by ID
router.delete("/criminals/:id", criminalController.deleteCriminal);
// Retrieve criminals by case ID
router.get("/criminals/case/:caseId", criminalController.getCriminalsByCaseId);

module.exports = router;
