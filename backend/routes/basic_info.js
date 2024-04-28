const express = require("express");
const router = express.Router();


const basicInfoController = require("../controllers/basic_info");

router.post("/", basicInfoController.createInfo);
router.get("/", basicInfoController.getAllInfo);
router.get("/:id", basicInfoController.  getInfoById,);
router.patch("/:id", basicInfoController.updateInfo);
router.delete("/:id", basicInfoController.deleteInfo);

module.exports = router;

