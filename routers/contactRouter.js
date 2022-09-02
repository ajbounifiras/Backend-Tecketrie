const express = require("express");
const conatctController=require("../controllers/contactController")
const router = express.Router();

router.get('/',conatctController.getAll)
router.get('/:id',conatctController.getone)
router.post('/',conatctController.create)
router.put('/:id',conatctController.update)
router.delete('/:id',conatctController.delete)


module.exports=router