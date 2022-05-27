const router = require('express').Router({ strict: true })
const monthOfConsumptionController = require('../controllers/month_of_consumption.controller')

// create a new moc
router.post('/', monthOfConsumptionController.create)

// delete a moc
router.delete('/:id', monthOfConsumptionController.delete)

module.exports = router