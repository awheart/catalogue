const router = require('express').Router({ strict: true })
const listIngredientsController = require('../controllers/list_ingredient.controller')
const { isAuthenticated } = require('../utils/verify_identity')

// get all list ingredient
router.get('/', isAuthenticated, listIngredientsController.getAll)

// create a new ingredient
router.post('/', isAuthenticated, listIngredientsController.create)

// delete a ingredient
router.delete('/:id', isAuthenticated, listIngredientsController.delete)

module.exports = router