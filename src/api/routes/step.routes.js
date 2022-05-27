const router = require('express').Router({ strict: true })
const stepsController = require('../controllers/step.controller')

// create a new step
router.post('/', stepsController.create)

// update a step
router.patch('/:id', stepsController.update)

// delete a step
router.delete('/:id', stepsController.delete)

module.exports = router