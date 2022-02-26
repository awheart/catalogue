const { config } = require('../config')
const User = require('../models/users.model')
const validator = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// register
module.exports.register = [
    // validations needed
    validator.body('user_name', 'Enter your name').isLength({ min: 1 }),
    validator.body('email', 'Enter a valid email').isLength({ min: 1 }),
    validator.body('email').custom(value => {
        return User.findOne({email:value})
            .then(user => {
                if (user !== null) return Promise.reject('User with this email already exist')
            })
    }),
    validator.body('password', 'Enter your password').isLength({ min: 4 }),
    
    (req, res) => {
        // throw errors
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })

        // create new user
        const user = new User({
            username: req.body.user_name,
            email: req.body.email,
            password: req.body.password
        })
        // encrypt password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(user.password, salt)
        user.password = hash

        // save user
        user.save((err, user) => {
            if (err) return res.status(500).json({ message: 'Error during the saving', error: err })
            return res.json({ message: 'Saved succesfully', _id: user._id })
        })
    }
]

// login
module.exports.login = [
    // validations needed
    validator.body('email', 'Enter your email').isLength({ min: 1 }),
    validator.body('password', 'Enter your password').isLength({ min: 4 }),

    (req, res) => {
        // throw errors
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })

        // check email & password exist & are correct
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) return res.status(500).json({ message: 'Error login in', error: err })
            if (user === null) return res.status(500).json({ message: 'User with this email does not exist' })
            
            // check password
            return bcrypt.compare(req.body.password, user.password, (err, isMatched) => {
                if (isMatched === true) {
                    return res.json({
                    user: {
                        _id: user._id,
                        email: user.email,
                        username: user.user_name
                    },
                    token: jwt.sign({ _id: user._id, email: user.email, username: user.user_name }, config.authSecret)
                    })
                } else {
                    return res.status(500).json({ message: 'Invalid Email or Password' })
                }
            })
        })

    }
]

// get User
module.exports.user = (req, res) => {
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
}