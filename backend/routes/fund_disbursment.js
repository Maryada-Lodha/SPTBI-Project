const express = require("express");
const router = express.Router();

const fund_disbursmentController = require("../controllers/fund_disbursment");

router.post("/", fund_disbursmentController.createFund_Disbursment);
router.get("/", fund_disbursmentController.getAllFund_Disbursments);
router.get("/:id", fund_disbursmentController.getFund_DisbursmentById);
router.patch("/:id", fund_disbursmentController.updateFund_Disbursment);
router.delete("/:id", fund_disbursmentController.deleteFund_Disbursment);

module.exports = router;

