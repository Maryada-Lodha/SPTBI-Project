const express = require("express");
const router = express.Router();

const founderInfoController = require("../controllers/founder_info");

router.post("/", founderInfoController.createInfo);
router.get("/", founderInfoController.getAllInfo);
// router.get("/:id", founderInfoController.getInfoById);
// router.patch("/:id", founderInfoController.updateInfo);
// router.delete("/:id", founderInfoController.deleteInfo);
router.get("/download", founderInfoController.downloadInfo);
router.post("/upload", founderInfoController.uploadFile);

module.exports = router;
