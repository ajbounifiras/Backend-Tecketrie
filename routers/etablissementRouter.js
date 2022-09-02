const express = require("express");
const etablissementController = require("../controllers/etablissementController");
const router = express.Router();

router.get("/", etablissementController.getAll);
router.get("/:id", etablissementController.getEtablissement);
router.post("/", etablissementController.create);
router.put("/:id", etablissementController.update);
router.delete("/:id", etablissementController.delete);

module.exports = router;
