const express = require("express");
const secteurController = require("../controllers/secteurController");
const route = express.Router();

route.get("/", secteurController.get);
route.post("/", secteurController.create);
route.get("/:id", secteurController.getone);
route.put("/:id", secteurController.update);
route.delete("/:id", secteurController.delete);
module.exports = route;
