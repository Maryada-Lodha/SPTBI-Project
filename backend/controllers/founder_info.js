const FounderInfo = require('../models/Founder_Info');
const Founder_Info = require("../models/Founder_Info");

const XLSX = require("xlsx");
const xlsx = require("xlsx");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
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
const downloadInfo = async (req, res) => {
  try {
    console.log("Downloading data");
    // Fetch data from the database
    const data = await Founder_Info.find();

    console.log(data);

    // Convert data to Excel format
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Write the workbook to a buffer
    // Write the workbook to a buffer and wait for it to complete
    const excelBufferPromise = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    // Wait for the buffer to be resolved
    const excelBuffer = await excelBufferPromise;

    // Send Excel file as response
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", 'attachment; filename="data.xlsx"');
    res.send(excelBuffer);
  } catch (error) {
    console.error("Error downloading data:", error);
    res.status(500).send("Error downloading data");
  }
};

const uploadFile = (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).send("Error uploading file");
    }

    try {
      const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);

      console.log(data);

      // Save data to database
      await Founder_Info.insertMany(data, { ordered: false });

      res.send("Data uploaded successfully");
    } catch (error) {
      console.error("Error parsing file:", error);
      res.status(400).send("Error parsing file");
    }
  });
};

module.exports = {
  getAllInfo,
  getInfoById,
  createInfo,
  updateInfo,
  deleteInfo,
  uploadFile,
  downloadInfo,
};
