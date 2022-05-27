const router = require('express').Router({ strict: true })
const userController = require('../controllers/user.controller')
const { isAuthenticated } = require('../utils/verify_identity')

// register
router.post('/register', userController.register)

// login
router.post('/login', userController.login)

// get user
router.get('/user', isAuthenticated, userController.getMe)

// get one user by id
router.get('/:id', isAuthenticated, userController.findById)

// get one user by filter
router.get(`/user/who`, isAuthenticated, userController.findOne)

// get all users
router.get('/', isAuthenticated, userController.getAll)

// update user as user
router.patch('/:id', isAuthenticated, userController.updateUser)

// update user as admin
router.patch('/admin/:id', isAuthenticated, userController.updateAdmin)

// delete user
router.delete('/:id', isAuthenticated, userController.delete)

module.exports = router