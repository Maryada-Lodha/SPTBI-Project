const Fund_Raised = require("../models/Fund_Raised");

//get all fund_raised
const getAllFund_Raised = async (req, res) => {
  try {
    const fund_raised = await Fund_Raised.find();
    res.status(200).json(fund_raised);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get fund_raised by id
const getFund_RaisedById = async (req, res) => {
  try {
    const fund_raised = await Fund_Raised.findById(req.params.id);
    if (!fund_raised) {
      return res.status(404).json({ message: "Fund_Raised not found" });
    }
    res.status(200).json(fund_raised);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//create fund_raised
const createFund_Raised = async (req, res) => {
  try {
    const fund_raised = new Fund_Raised(req.body);
    const savedFund_Raised = await fund_raised.save();
    res.status(201).json(savedFund_Raised);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//update fund_raised
const updateFund_Raised = async (req, res) => {
  try {
    const updatedFund_Raised = await Fund_Raised.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFund_Raised) {
      return res.status(404).json({ message: "Fund_Raised not found" });
    }
    res.status(200).json(updatedFund_Raised);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete fund_raised
const deleteFund_Raised = async (req, res) => {
  try {
    const deletedFund_Raised = await Fund_Raised.findByIdAndDelete(
      req.params.id
    );
    if (!deletedFund_Raised) {
      return res.status(404).json({ message: "Fund_Raised not found" });
    }
    res.status(200).json(deletedFund_Raised);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllFund_Raised,
  getFund_RaisedById,
  createFund_Raised,
  updateFund_Raised,
  deleteFund_Raised,
};
