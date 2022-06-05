require('dotenv').config()
const { getters: userGetters, mutations: userMutations } = require('../models/users')
const { getters: userRoleGetters } = require('../models/user_role')
const validator = require('express-validator')
const jwt = require('jsonwebtoken')
const { Error_Messages } = require('../utils/errors_handler')
const encryption = require('../utils/encryption')

const asyncAction = (action) => (req, res, next) => action(req, res, next).catch(next)

// register
module.exports.register = [

    // validations rules
    validator.body('username', Error_Messages.user_is_empty).isLength({ min: 1 }),
    validator.body('username').custom(async value => {
        const usernameCheck = await userGetters.findOne({ username: value })
        if (usernameCheck) return Promise.reject(Error_Messages.username_existing)
    }),

    validator.body('email', Error_Messages.email_is_empty).isLength({ min: 1 }),
    validator.body('email', Error_Messages.invalid_email).isEmail(),
    validator.body('email').custom(async value => {
        const emailCheck = await userGetters.findOne({ email: value })
        if (emailCheck) return Promise.reject(Error_Messages.email_existing)
    }),

    validator.body('password', Error_Messages.password_is_empty).isLength({ min: 4 }),

    asyncAction(async (req, res) => {
        // throw validation errors
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })

        // check role

        const role = await userRoleGetters.findOne({ role_name: 'user' })
        req.body.role_id = role.id

        // encrypt password
        req.body.password = encryption.password(req.body.password)

        // create user
        const user = await userMutations.create(req.body)
        if (!user) return res.json({ message: Error_Messages.unauthorized_action })
        res.json(user)
    })
]

// login
module.exports.login = [
    // validation rules
    validator.body('email', Error_Messages.email_is_empty).isLength({ min: 1 }),
    validator.body('email', Error_Messages.invalid_email).isEmail(),
    validator.body('password', Error_Messages.password_is_needed).isLength({ min: 4 }),

    asyncAction(async (req, res) => {
        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })

        // check email & password exist & are correct
        const { email, password } = req.body
        const user = await userGetters.findOne({ email: email })
        if (!user) return res.status(404).json({ message: Error_Messages.invalid_credentials })

        // check password
        const isMatched = encryption.compare(password, user.password)
        if (isMatched === true) {
            return res.json({
                user: {
                    message: 'login successful',
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                },
                token: jwt.sign({ _id: user._id, email: user.email, username: user.username, role: user.role }, process.env.JWT_TOKEN, { expiresIn: '15m' })
            })
        } else {
            return res.status(500).json({ message: Error_Messages.invalid_credentials })
        }
    })
]

// get User
module.exports.getMe = asyncAction(async (req, res) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token.replace(/^Bearer\s/, ''), process.env.JWT_TOKEN, (err, decoded) => {
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
    const user = await userGetters.findById(id)
    if (!user) return res.status(404).json({ message: Error_Messages.user_id_is_invalid })
    res.json(user)
})

// get one user by filter
module.exports.findOne = asyncAction(async (req, res) => {
    const filter = req.query
    const user = await userGetters.findOne(filter)
    if (!user) return res.status(404).json({ message: Error_Messages.invalid_filter })
    return res.json(user)
})

// get all users
module.exports.getAll = asyncAction(async (req, res) => {
    const filter = req.query
    const users = await userGetters.getAll(filter)
    return res.json(users)
})

module.exports.updateAdmin = [
    // validation rules
    validator.body('username', Error_Messages.user_is_empty).isLength({ min: 4 }),
    validator.body('username').custom(async value => {
        const user = await userGetters.findOne({ username: value })
        if (user) return Promise.reject(Error_Messages.username_existing)
    }),
    asyncAction(async (req, res) => {
        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) res.status(422).json({ errors: errors.mapped() })

        const data = req.body
        const { id } = req.params
        try {
            const userPatched = await userMutations.patch(id, data)
            if (!userPatched) return res.status(404).json({ message: Error_Messages.user_not_found })
            res.json(userPatched)
        } catch (err) {
            console.log(err)
        }
    })
]

// update User
module.exports.updateUser = [
    // validation rules

    validator.body('username', Error_Messages.user_is_empty).isLength({ min: 4 }),
    validator.body('username').custom(async (value, { req }) => {
        const { id } = req.params
        const user = await userGetters.findOne({ username: value })
        if (user.id != id) return Promise.reject(Error_Messages.username_existing)
    }),
    validator.body('password', Error_Messages.old_password_empty)
        .if(validator.body('newPassword').exists({ checkNull: true }))
        .notEmpty()
        .custom(async (value, { req }) => {
            const user = await userGetters.findById(req.params.id)
            if (!user) return Promise.reject(Error_Messages.user_not_found)
            const isMatch = encryption.compare(value, user.password)
            if (!isMatch) return Promise.reject(Error_Messages.invalid_old_password)
        }),
    validator.body('newPassword', Error_Messages.new_password_empty)
        .if(validator.body('password').exists({ checkNull: true }))
        .notEmpty()
        .isLength({ min: 4 })
        .custom((value, { req }) => {
            if (value == req.body.password) {
                return Promise.reject(Error_Messages.password_cannot_match)
            } else return true
        }),

    validator.body('passwordCheck')
        .if(validator.body('newPassword').exists({ checkNull: true }))
        .custom(async (value, { req }) => {
            if (value !== req.body.newPassword) {
                return Promise.reject(Error_Messages.password_no_match)
            } else return true
        }),

    asyncAction(async (req, res) => {

        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })

        const { id } = req.params
        const body = req.body

        try {
            if (body.newPassword) {
                // encrypt password
                const newUserPassword = encryption.password(body.newPassword)
                body.password = newUserPassword
                delete body.newPassword
                delete body.passwordCheck
                console.log('body: ', body)
                req.body.password = newUserPassword
            }

            const data = req.body

            const userPatched = await userMutations.patch(id, data)
            if (!userPatched) return res.status(404).json({ message: Error_Messages.user_not_found })
            res.json(userPatched)
        } catch (err) {
            console.log(err)
        }
    })
]

// delete User
module.exports.delete = asyncAction(async (req, res) => {
    const id = req.params.id
    const userDeleted = await userMutations.deleteById(id)
    if (!userDeleted) return res.status(404).json({ message: Error_Messages.user_not_found })
    res.json('L\'utilisateur a bien été supprimé').send()
})