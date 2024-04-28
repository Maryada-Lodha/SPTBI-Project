const express = require("express");
const router = express.Router();

const patentController = require("../controllers/patent");

router.post("/", patentController.createPatent);
router.get("/", patentController.getAllPatents);
router.get("/:id", patentController.getPatentById);
router.patch("/:id", patentController.updatePatent);
router.delete("/:id", patentController.deletePatent);

module.exports = router;
