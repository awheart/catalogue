const router = require('express').Router({ strict: true })
const monthOfConsumptionController = require('../controllers/month_of_consumption.controller')
const { isAuthenticated } = require('../utils/verify_identity')

// create a new moc
router.post('/', isAuthenticated, monthOfConsumptionController.create)

// delete a moc
router.delete('/:id', isAuthenticated, monthOfConsumptionController.delete)

module.exports = router