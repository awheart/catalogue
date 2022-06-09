const router = require('express').Router({ strict: true })
const commentsController = require('../controllers/comment.controller')
const { isAuthenticated } = require('../utils/verify_identity')

// create a new comment
router.post('/', isAuthenticated, commentsController.create)

// update a comment
router.patch('/:id', isAuthenticated, commentsController.update)

// delete a comment
router.delete('/:id', isAuthenticated, commentsController.delete)

module.exports = router