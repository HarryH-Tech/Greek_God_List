const express = require("express");
const router = express.Router();

const {
  getAllGods,
  createGod,
  updateGod,
  deleteManyGods,
  deleteGod,
} = require("../controllers/god");

router.get("/gods", getAllGods);
router.post("/gods/add_god", createGod);
router.put("/gods/update_god/:id", updateGod);
router.delete("/gods/delete_gods/:id", deleteManyGods);
router.delete("/gods/delete_god/:id", deleteGod);

module.exports = router;
