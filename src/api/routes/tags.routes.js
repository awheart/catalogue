const router = require('express').Router({ strict: true })
const tagsController = require('../controllers/tags.controller')

// get tags
router.get('/', tagsController.getAll)

// get one tag
router.get('/:id', tagsController.findOne)

// create a new tag
router.post('/', tagsController.create)

// update a tag
router.patch('/:id', tagsController.update)

module.exports = router