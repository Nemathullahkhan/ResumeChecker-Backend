const express = require("express");
const { analyzeResume } = require("../controllers/analyze");
const router = express.Router();

router.use("/", analyzeResume);

module.exports = router;