const express = require("express");
const router = express.Router();

const fund_raisedController = require("../controllers/fund_raised");

router.post("/", fund_raisedController.createFund_Raised);
router.get("/", fund_raisedController.getAllFund_Raised);
router.get("/:id", fund_raisedController.getFund_RaisedById);
router.patch("/:id", fund_raisedController.updateFund_Raised);
router.delete("/:id", fund_raisedController.deleteFund_Raised);

module.exports = router;
