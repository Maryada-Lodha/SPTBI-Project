const BasicInfo = require("../models/Basic_Info");

//get all info
const getAllInfo = async (req, res) => {
  try {
    const basicInfos = await BasicInfo.find();
    res.status(200).json(basicInfos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get info by id
const getInfoById = async (req, res) => {
  try {
    const basicInfo = await BasicInfo.findById(req.params.id);
    if (!basicInfo) {
      return res.status(404).json({ message: "Basic info not found" });
    }
    res.status(200).json(basicInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//create info
const createInfo = async (req, res) => {
  try {
    const basicInfo = new BasicInfo(req.body);
    const savedBasicInfo = await basicInfo.save();
    res.status(201).json(savedBasicInfo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//update info
const updateInfo = async (req, res) => {
  try {
    const updatedBasicInfo = await BasicInfo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBasicInfo) {
      return res.status(404).json({ message: "Basic info not found" });
    }
    res.status(200).json(updatedBasicInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete info
const deleteInfo = async (req, res) => {
  try {
    const deletedBasicInfo = await BasicInfo.findByIdAndDelete(req.params.id);
    if (!deletedBasicInfo) {
      return res.status(404).json({ message: "Basic info not found" });
    }
    res.status(200).json({ message: "Basic info deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllInfo,
  getInfoById,
  createInfo,
  updateInfo,
  deleteInfo,
};
