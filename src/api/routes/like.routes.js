const router = require('express').Router({ strict: true })
const likesController = require('../controllers/like.controller')
const { isAuthenticated } = require('../utils/verify_identity')

// create a new like
router.post('/', isAuthenticated, likesController.create)

// delete a like
router.delete('/', isAuthenticated, likesController.delete)

module.exports = router