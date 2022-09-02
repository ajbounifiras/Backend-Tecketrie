const express = require("express");
const etatController = require("../controllers/etatController");
const route = express.Router();

route.get("/", etatController.get);
route.post("/", etatController.create);
route.get("/:id", etatController.getone);
route.put("/:id", etatController.update);
route.delete("/:id", etatController.delete);

module.exports = route;
