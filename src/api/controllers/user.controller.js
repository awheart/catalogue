const { config } = require('../config')
const userModel = require('../models/user.model')
const validator = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
0

const asyncAction = (action) => (req, res, next) => action(req, res, next).catch(next)

// register
module.exports.register = [
    // validations rules
    validator.body('name', 'Name is required').isLength({ min: 1 }),
    validator.body('email', 'Email is required').isLength({ min: 1 }),
    validator.body('email').custom(async value => {
        const emailCheck = await userModel.find({ email: value})
        if (emailCheck.length !== 0) return Promise.reject('Email already exist' )
    }),
    validator.body('password', 'Password is required').isLength({ min: 1 }),
    
    asyncAction(async (req, res) => {
        // throw validation errors
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })

        // check for admin authorization
        if (req.body.role !== 'admin') req.body.role = 'user'

        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        }, err => {
            if (err) return res.status(500).json({ message: 'Error saving user'})
        })

        // encrypt password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(user.password, salt)
        user.password = hash
        
        user.save((err, user) => {
            if (err) return res.status(500).json({ message: 'Error while saving', error: err })
            res.json(user)
        })
    })
]

// login
module.exports.login = [
    // validation rules
    validator.body('email', 'Email is required').isLength({ min: 1 }),
    validator.body('password', 'Password is required').isLength({ min: 1 }),

    asyncAction(async(req, res) => {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    // check email & password exist & are correct
    const { email, password } = req.body
    const user = await userModel.findOne({ email: email })

    if (!user) return res.status(404).json({ message: 'Invalid Email or Password'})
    // check password
    bcrypt.compare(password, user.password, (err, isMatched) => {
        if (isMatched === true) {
            return res.json({ 
            user: {
                message: 'login successful',
                _id: user._id,
                email: user.email,
                name: user.name
            },
            token: jwt.sign({ _id: user._id, email: user.email, name: user.name }, config.authSecret)
            })
        } else {
            return res.status(500).json({ message: 'Invalid Email or Password', error: err })
        }
    })

})
]

// get User
module.exports.getMe = asyncAction(async (req, res) => {
    const token = req.headers.authorization
    if(token){
        jwt.verify(token.replace(/^Bearer\s/, ''), config.authSecret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' })
            } else {
                return res.json({ user: decoded })
            }
        })
    } else {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    })

// get one user
module.exports.showOne = asyncAction(async (req, res) => {
    const id = req.params.id
    const user = await userModel.findById(id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
})

// get all users
module.exports.getAll = asyncAction(async (req, res) => {
    const users = await userModel.find()
    if (users.length == 0) return res.status(500).json({ message: 'No user recorded' })
    res.json(users)
})

// update User
module.exports.update = [
    // validation rules
    validator.body('password', 'Password is required').isLength({ min: 1 }),

    asyncAction(async (req, res) => {
    // throw validation errors
    const errors = validator.validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })

        const data = req.body
        const id = req.params.id

        // encrypt password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(data.password, salt)
        data.password = hash

        const user = await userModel.findByIdAndUpdate({ _id: id }, data, { new: true })
        if (!user) return res.status(404).json({ message: 'User not found' })
        res.json(user)
    })
]

// delete User
module.exports.delete = asyncAction(async (req, res) => {
    const id = req.params.id
    const article = await userModel.findById(id)
    if(!article) return res.status(404).json({ message: 'User not found'})
    await userModel.deleteOne({ _id: id })
    res.json('User deleted').send()   
})