const router = require('express').Router({ strict: true })
const stepsController = require('../controllers/step.controller')
const { isAuthenticated } = require('../utils/verify_identity')

// create a new step
router.post('/', isAuthenticated, stepsController.create)

// update a step
router.patch('/:id', isAuthenticated, stepsController.update)

// delete a step
router.delete('/:id', isAuthenticated, stepsController.delete)

module.exports = router