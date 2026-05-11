const catatanModel = require("../models/catatanModels");

const getAllCatatan = async (req, res) => {
  try {
    const allCatatan = await catatanModel.findAll();
    res.status(200).json({
      message: "Catatan retrieved successfully",
      data: allCatatan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving catatan",
      error: error.message,
    });
  }
};

const createCatatan = async (req, res) => {
  const { judul, isi } = req.body;

  if (!judul || !isi) {
    return res.status(400).json({ message: "Judul dan isi wajib diisi" });
  }

  try {
    const newCatatan = await catatanModel.create({
      judul,
      isi,
      tanggal_dibuat: new Date(),
    });
    res.status(201).json({
      message: "Catatan created successfully",
      data: newCatatan,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation error",
      error: error.message,
    });
  }
};

const getCatatanById = async (req, res) => {
  const { id } = req.params;

  try {
    const catatan = await catatanModel.findById(id);

    if (!catatan) {
      return res.status(404).json({ message: "Catatan not found" });
    }

    res.status(200).json({
      message: "Catatan retrieved successfully",
      data: catatan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving catatan",
      error: error.message,
    });
  }
};

const updateCatatan = async (req, res) => {
  const { id } = req.params;
  const { judul, isi } = req.body;

  try {
    const catatan = await catatanModel.findById(id);

    if (!catatan) {
      return res.status(404).json({ message: "Catatan not found" });
    }

    await catatanModel.updateById(id, { judul, isi });
    const updated = await catatanModel.findById(id);

    res.status(200).json({
      message: "Catatan updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating catatan",
      error: error.message,
    });
  }
};

const deleteCatatan = async (req, res) => {
  const { id } = req.params;

  try {
    const catatan = await catatanModel.findById(id);

    if (!catatan) {
      return res.status(404).json({ message: "Catatan not found" });
    }

    await catatanModel.deleteById(id);
    res.status(200).json({
      message: "Catatan deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting catatan",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCatatan,
  createCatatan,
  getCatatanById,
  updateCatatan,
  deleteCatatan,
};
