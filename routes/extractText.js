const express = require("express");
const router = express.Router();
const { readText ,someFunction} = require("../controllers/extractText");


router.get("/", readText);

router.get("/someFunction", someFunction);

module.exports = router; 