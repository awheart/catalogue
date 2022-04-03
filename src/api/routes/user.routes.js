const router = require('express').Router({ strict: true })
const userController = require('../controllers/user.controller')

// register
router.post('/register', userController.register)

// login
router.post('/login', userController.login)

// get user
router.get('/user', userController.getMe)

// get one user
router.get('/:id', userController.showOne)

// get all users
router.get('/', userController.getAll)

// update user as user
router.patch('/:id', userController.updateUser)

// update user as admin
router.patch('/admin/:id', userController.updateAdmin)

// delete user
router.delete('/:id', userController.delete)

module.exports = router