const router = require('express').Router({ strict: true })
const commentsController = require('../controllers/comment.controller')

// create a new comment
router.post('/', commentsController.create)

// update a comment
router.patch('/:id', commentsController.update)

// delete a comment
router.delete('/:id', commentsController.delete)

module.exports = router