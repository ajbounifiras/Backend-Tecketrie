const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getUser);
router.post("/",userController.register)
router.patch("/:id", userController.update);
router.delete("/:id", userController.delete);
router.post("/login", userController.login);
module.exports = router;
