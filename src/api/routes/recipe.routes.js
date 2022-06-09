const router = require('express').Router({ strict: true })
const recipesController = require('../controllers/recipe.controller')
const { isAuthenticated } = require('../utils/verify_identity')

// get recipes
router.get('/', recipesController.getAll)

// get one recipe
router.get('/:id', recipesController.findOne)

// create a new recipe
router.post('/', isAuthenticated, recipesController.create)

// update a recipe
router.patch('/:id', isAuthenticated, recipesController.update)

// delete a recipe
router.delete('/:id', isAuthenticated, recipesController.delete)

module.exports = router