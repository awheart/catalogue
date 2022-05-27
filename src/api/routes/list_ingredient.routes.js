const router = require('express').Router({ strict: true })
const listIngredientsController = require('../controllers/list_ingredient.controller')
const { isAuthenticated } = require('../utils/verify_identity')

// create a new step
router.post('/', isAuthenticated, listIngredientsController.create)

// update a step
router.patch('/:id', isAuthenticated, listIngredientsController.update)

// delete a step
router.delete('/:id', isAuthenticated, listIngredientsController.delete)

module.exports = router