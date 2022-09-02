const express = require("express");
const adminController = require("../controllers/AdminController");
const router = express.Router();

router.get("/", adminController.getAll);
router.get("/:id", adminController.getUser);
router.post("/", adminController.register);
router.patch("/:id", adminController.update);
router.delete("/:id", adminController.deleteData);
router.post("/login", adminController.login);

module.exports = router;
