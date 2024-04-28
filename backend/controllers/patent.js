const Patent = require("../models/Patent");

//get all patents
const getAllPatents = async (req, res) => {
  try {
    const patents = await Patent.find();
    res.status(200).json(patents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get patent by id
const getPatentById = async (req, res) => {
  try {
    const patent = await Patent.findById(req.params.id);
    if (!patent) {
      return res.status(404).json({ message: "Patent not found" });
    }
    res.status(200).json(patent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//create patent
const createPatent = async (req, res) => {
  try {
    const patent = new Patent(req.body);
    const savedPatent = await patent.save();
    res.status(201).json(savedPatent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//update patent
const updatePatent = async (req, res) => {
  try {
    const updatedPatent = await Patent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPatent) {
      return res.status(404).json({ message: "Patent not found" });
    }
    res.status(200).json(updatedPatent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete patent
const deletePatent = async (req, res) => {
  try {
    const deletedPatent = await Patent.findByIdAndDelete(req.params.id);
    if (!deletedPatent) {
      return res.status(404).json({ message: "Patent not found" });
    }
    res.status(204).json(deletedPatent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllPatents,
  getPatentById,
  createPatent,
  updatePatent,
  deletePatent,
};
