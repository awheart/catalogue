const router = require('express').Router({ strict: true })
const likesController = require('../controllers/like.controller')

// create a new like
router.post('/', likesController.create)

// delete a like
router.delete('/', likesController.delete)

module.exports = router