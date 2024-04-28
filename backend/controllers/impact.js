const Impact = require('../models/Impact');

//get all impacts
const getAllImpacts = async (req, res) => {
  try {
    const impacts = await Impact.find();
    res.status(200).json(impacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get impact by id
const getImpactById = async (req, res) => {
  try {
    const impact = await Impact.findById(req.params.id);
    if (!impact) {
      return res.status(404).json({ message: 'Impact not found' });
    }
    res.status(200).json(impact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//create impact
const createImpact = async (req, res) => {
  try {
    const impact = new Impact(req.body);
    const savedImpact = await impact.save();
    res.status(201).json(savedImpact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//update impact
const updateImpact = async (req, res) => {
  try {
    const updatedImpact = await Impact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedImpact) {
      return res.status(404).json({ message: 'Impact not found' });
    }
    res.status(200).json(updatedImpact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete impact
const deleteImpact = async (req, res) => {
  try {
    const deletedImpact = await Impact.findByIdAndDelete(req.params.id);
    if (!deletedImpact) {
      return res.status(404).json({ message: 'Impact not found' });
    }
    res.status(200).json(deletedImpact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllImpacts,
  getImpactById,
  createImpact,
  updateImpact,
  deleteImpact,
};
