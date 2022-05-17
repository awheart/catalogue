const router = require('express').Router({ strict: true })
const recipesController = require('../controllers/recipe.controller')

// get recipes
router.get('/', recipesController.list)

// get one recipe
router.get('/:id', recipesController.showOne)

// create a new recipe
router.post('/', recipesController.create)

// update a recipe
router.patch('/:id', recipesController.update)

// delete a recipe
router.delete('/:id', recipesController.delete)

module.exports = router