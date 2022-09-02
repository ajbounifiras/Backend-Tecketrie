const express=require('express')
const reservationController=require('../controllers/reservationController')
const router=express.Router()

router.get('/',reservationController.get)
router.get('/:id',reservationController.getOne)
router.post('/',reservationController.create)
router.put('/:id',reservationController.update)
router.delete('/:id',reservationController.delete)

module.exports=router