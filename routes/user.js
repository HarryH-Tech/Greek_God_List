const express = require("express");
const router = express.Router();

//
router.get("/login", (req, res) => {
  res.send("HI");
  console.log("HI");
});

module.exports = router;
