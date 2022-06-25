const router = require('express').Router({ strict: true })
const priceController = require('../controllers/price.controller')
const { isAuthenticated } = require('../utils/verify_identity')

// get prices
router.get('/', isAuthenticated, priceController.getAll)

// get one price
router.get('/:id', isAuthenticated, priceController.findOne)

module.exports = router