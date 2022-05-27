const router = require('express').Router({ strict: true })
const recipeTagsController = require('../controllers/recipe_tags.controller')
const { isAuthenticated } = require('../utils/verify_identity')

// create a new like
router.post('/', isAuthenticated, recipeTagsController.create)

// delete a like
router.delete('/:id', isAuthenticated, recipeTagsController.delete)

module.exports = router