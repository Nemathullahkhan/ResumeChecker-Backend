const express = require("express");
const multer = require("multer");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

const { pdfUpload } = require("../controllers/extractText");

router.post("/", upload.single("resume"), pdfUpload);

router.get("/status", (req, res) => {
  return res.send("Hello World");
});


module.exports = router;
