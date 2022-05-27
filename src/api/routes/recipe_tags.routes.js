const router = require('express').Router({ strict: true })
const recipeTagsController = require('../controllers/recipe_tags.controller')

// create a new like
router.post('/', recipeTagsController.create)

// delete a like
router.delete('/:id', recipeTagsController.delete)

module.exports = router