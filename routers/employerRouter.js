const express = require("express");
const employerController = require("../controllers/employerController");
const employerValidateur = require("../models/employerModel");
const router = express.Router();

router.get("/", employerController.getAll);
router.get("/:id", employerController.getUser);
router.post("/", employerController.register);
router.put("/:id", employerController.update);
router.delete("/:id", employerController.deleteData);
router.post("/login", employerController.login);

module.exports = router;
