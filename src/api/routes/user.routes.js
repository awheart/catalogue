const { Router } = require('express')

const router = Router()

const userController = require('../controllers/user.controller')

// register
router.post('/users/register', userController.register)

// login
router.post('/users/login', userController.login)

// get user
router.get('/users/user', userController.user)

module.exports = router