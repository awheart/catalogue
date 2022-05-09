const { configSecret } = require('../config/config')
const { getters: userGetter, mutations: userMutation } = require('../models/users')
const validator = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { Error_Messages } = require('../utils/errors_handler')

const asyncAction = (action) => (req, res, next) => action(req, res, next).catch(next)

// register
module.exports.register = [
    // validations rules
    validator.body('username', Error_Messages.user_is_empty).isLength({ min: 1 }),
    validator.body('email', Error_Messages.email_is_empty).isLength({ min: 1 }),
    validator.body('email').custom(async value => {
        const emailCheck = await userGetter.findOne({ email: value })
        console.log(emailCheck?.length)
        // if (emailCheck.length !== 0) return Promise.reject(Error_Messages.email_existing)
    }),
    validator.body('password', Error_Messages.password_is_empty).isLength({ min: 4 }),

    asyncAction(async (req, res) => {
        // throw validation errors
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })

        // check for admin authorization
        if(req.body.role !== 'admin') req.body.role = 'user'
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        req.body.password = hash

        const user = await userMutation.create(req.body)
        res.json(user)
    })
]

// login
module.exports.login = [
    // validation rules
    validator.body('email', Error_Messages.email_is_empty).isLength({ min: 1 }),
    validator.body('password', Error_Messages.password_is_empty).isLength({ min: 4 }),

    asyncAction(async (req, res) => {
        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
        // check email & password exist & are correct
        const { email, password } = req.body
        const user = await userGetter.findOne({ email: email })
        if (!user) return res.status(404).json({ message: Error_Messages.invalid_credentials })

        // check password
        bcrypt.compare(password, user.password, (err, isMatched) => {
            if (isMatched === true) {
                return res.json({
                    user: {
                        message: 'login successful',
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role
                    },
                    token: jwt.sign({ _id: user._id, email: user.email, username: user.username, role: user.role }, configSecret.authSecret)
                })
            } else {
                return res.status(500).json({ message: Error_Messages.invalid_credentials, error: err })
            }
        })

    })
]

// get User
module.exports.getMe = asyncAction(async (req, res) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token.replace(/^Bearer\s/, ''), configSecret.authSecret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: Error_Messages.unauthorized_action })
            } else {
                return res.json({ user: decoded })
            }
        })
    } else {
        return res.status(401).json({ message: Error_Messages.unauthorized_action })
    }
})

// get one user by id
module.exports.findById = asyncAction(async (req, res) => {
    const id = req.params.id
    const user = await userGetter.findById(id)
    if (!user) return res.status(404).json({ message: Error_Messages.user_id_is_invalid })
    res.json(user)
})

// get one user by filter
module.exports.findOne = asyncAction(async (req, res) => {
    const filter = req.query
    const user = await userGetter.findOne(filter)
    if(!user) return res.status(404).json({ message: Error_Messages.user_id_is_invalid })
    return res.json(user)
})

// get all users
module.exports.getAll = asyncAction(async (req, res) => {
    const users = await userGetter.getAll()
    return res.json(users)
})

module.exports.updateAdmin = [
    // validation rules
    validator.body('username', Error_Messages.user_is_empty).isLength({ min: 1 }),
    validator.body('username').custom(async value => {
        const user = await userGetter.findOne({ username: value })
        if (user !== null) {
            return Promise.reject(Error_Messages.username_existing);
        }
    }),
    asyncAction(async (req, res) => {
        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) res.status(422).json({ errors: errors.mapped() });

        const data = req.body
        const id = req.params.id
        const user = await userGetter.findById({ _id: id })
        if (!user) return res.status(404).json({ message: Error_Messages.user_not_found })
        user.update({ data })
        res.json(user)
    })
]

// update User
module.exports.updateUser = [
    // validation rules
    validator.body('password', Error_Messages.password_is_empty).isLength({ min: 4 }),

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

        const user = await userGetter.findById({ id })
        if (!user) return res.status(404).json({ message: Error_Messages.user_not_found })
        user.update({ data })
        res.json(user)
    })
]

// delete User
module.exports.delete = asyncAction(async (req, res) => {
    const id = req.params.id
    const article = await userGetter.findById(id)
    if (!article) return res.status(404).json({ message: Error_Messages.user_not_found })
    await userMutation.deleteById(id)
    res.json('User deleted').send()
})