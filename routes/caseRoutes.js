const express = require("express");
const router = express.Router();
const multer = require("multer");
const caseController = require("../controllers/caseContoller");

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post("/cases", upload.single("image"), caseController.createCase);
router.get("/cases", caseController.getCases);
router.get("/cases/:id", caseController.getCaseById);

// Get cases by phone number
router.get("/cases/phone/:phoneNumber", caseController.getCasesByPhoneNumber);
router.delete("/cases/:id", caseController.deleteCaseById);
router.put("/cases/:id", upload.single("image"), caseController.updateCaseData);

module.exports = router;
