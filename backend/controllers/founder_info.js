const FounderInfo = require('../models/Founder_Info');

//get all info
const getAllInfo = async (req, res) => {
  try {
    const founderInfos = await FounderInfo.find();
    res.status(200).json(founderInfos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get info by id
const getInfoById = async (req, res) => {
  try {
    const founderInfo = await FounderInfo.findById(req.params.id);
    if (!founderInfo) {
      return res.status(404).json({ message: 'Founder info not found' });
    }
    res.status(200).json(founderInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//create info
const createInfo = async (req, res) => {
  try {
    const founderInfo = new FounderInfo(req.body);
    const savedFounderInfo = await founderInfo.save();
    res.status(201).json(savedFounderInfo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//update info
const updateInfo = async (req, res) => {
  try {
    const updatedFounderInfo = await FounderInfo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFounderInfo) {
      return res.status(404).json({ message: 'Founder info not found' });
    }
    res.status(200).json(updatedFounderInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete info
const deleteInfo = async (req, res) => {
  try {
    const deletedFounderInfo = await FounderInfo.findByIdAndDelete(req.params.id);
    if (!deletedFounderInfo) {
      return res.status(404).json({ message: 'Founder info not found' });
    }
    res.status(200).json(deletedFounderInfo);
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
    