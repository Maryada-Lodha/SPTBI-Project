const express = require("express");
const router = express.Router();

const impactController = require("../controllers/impact");

router.post("/", impactController.createImpact);
router.get("/", impactController.getAllImpacts);
router.get("/:id", impactController.getImpactById);
router.patch("/:id", impactController.updateImpact);
router.delete("/:id", impactController.deleteImpact);

module.exports = router;
