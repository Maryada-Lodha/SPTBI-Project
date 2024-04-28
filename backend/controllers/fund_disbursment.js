const Fund_Disbursment = require("../models/Fund_Disbursment");

//get all fund_disbursments
const getAllFund_Disbursments = async (req, res) => {
  try {
    const fund_disbursments = await Fund_Disbursment.find();
    res.status(200).json(fund_disbursments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get fund_disbursment by id
const getFund_DisbursmentById = async (req, res) => {
  try {
    const fund_disbursment = await Fund_Disbursment.findById(req.params.id);
    if (!fund_disbursment) {
      return res.status(404).json({ message: "Fund_Disbursment not found" });
    }
    res.status(200).json(fund_disbursment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//create fund_disbursment
const createFund_Disbursment = async (req, res) => {
  try {
    const fund_disbursment = new Fund_Disbursment(req.body);
    const savedFund_Disbursment = await fund_disbursment.save();
    res.status(201).json(savedFund_Disbursment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//update fund_disbursment
const updateFund_Disbursment = async (req, res) => {
  try {
    const updatedFund_Disbursment = await Fund_Disbursment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFund_Disbursment) {
      return res.status(404).json({ message: "Fund_Disbursment not found" });
    }
    res.status(200).json(updatedFund_Disbursment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete fund_disbursment
const deleteFund_Disbursment = async (req, res) => {
  try {
    const deletedFund_Disbursment = await Fund_Disbursment.findByIdAndDelete(
      req.params.id
    );
    if (!deletedFund_Disbursment) {
      return res.status(404).json({ message: "Fund_Disbursment not found" });
    }
    res.status(200).json(deletedFund_Disbursment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllFund_Disbursments,
  getFund_DisbursmentById,
  createFund_Disbursment,
  updateFund_Disbursment,
  deleteFund_Disbursment,
};
