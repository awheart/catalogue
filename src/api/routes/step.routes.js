const router = require('express').Router({ strict: true })
const stepsController = require('../controllers/step.controller')
const { isAuthenticated } = require('../utils/verify_identity')

// get all list ingredient
router.get('/', isAuthenticated, stepsController.getAll)

// create a new step
router.post('/', isAuthenticated, stepsController.create)

// delete a step
router.delete('/:id', isAuthenticated, stepsController.delete)

module.exports = router