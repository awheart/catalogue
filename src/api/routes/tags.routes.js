const router = require('express').Router({ strict: true })
const tagsController = require('../controllers/tags.controller')
const { isAuthenticated } = require('../utils/verify_identity')
// get tags
router.get('/', tagsController.getAll)

// get one tag
router.get('/:id', tagsController.findOne)

// create a new tag
router.post('/', isAuthenticated, tagsController.create)

// update a tag
router.patch('/:id', isAuthenticated, tagsController.update)

module.exports = router