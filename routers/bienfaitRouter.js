const express = require("express");
const bienfaitController=require('../controllers/bienfaitController');
const router=express.Router();


router.get("/", bienfaitController.getAll);
router.get("/:id", bienfaitController.getService);
router.post("/", bienfaitController.create);
router.put("/:id", bienfaitController.update);
router.delete("/:id", bienfaitController.delete);

module.exports = router;