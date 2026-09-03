const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const {
  saveCalculation,
  getCalculations,
  deleteCalculation,
} = require("../controllers/calculationController");

router.post("/", authMiddleware, saveCalculation);
router.get("/user/:userId", authMiddleware, getCalculations);
router.delete("/:id", authMiddleware, deleteCalculation);

module.exports = router;