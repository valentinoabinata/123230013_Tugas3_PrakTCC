const express = require("express");
const router = express.Router();
const catatanController = require("../controllers/catatanController");

router.get("/", catatanController.getAllCatatan);
router.get("/:id", catatanController.getCatatanById);
router.post("/", catatanController.createCatatan);
router.put("/:id", catatanController.updateCatatan);
router.delete("/:id", catatanController.deleteCatatan);

module.exports = router;
