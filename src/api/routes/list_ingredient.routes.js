const router = require('express').Router({ strict: true })
const listIngredientsController = require('../controllers/list_ingredient.controller')

// create a new step
router.post('/', listIngredientsController.create)

// update a step
router.patch('/:id', listIngredientsController.update)

// delete a step
router.delete('/:id', listIngredientsController.delete)

module.exports = router