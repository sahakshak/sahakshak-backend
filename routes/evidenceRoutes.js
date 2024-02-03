const express = require("express");
const router = express.Router();
const multer = require("multer");
const evidenceController = require("../controllers/evidenceController");

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

// Create a new evidence
router.post(
  "/evidence",
  upload.single("image"),
  evidenceController.createEvidence
);

// Get all evidence
router.get("/evidence", evidenceController.getEvidence);

// Get evidence by ID
router.get("/evidence/:id", evidenceController.getEvidenceById);

// Update evidence by ID
router.put(
  "/evidence/:id",
  upload.single("image"),
  evidenceController.updateEvidence
);

// Delete evidence by ID
router.delete("/evidence/:id", evidenceController.deleteEvidence);

// Retrieve evidence records by case ID
router.get("/evidence/case/:caseId", evidenceController.getEvidenceByCaseId);

module.exports = router;
