const { getters: commentGetters, mutations: commentMutations } = require('../models/comments')
const { getters: recipeGetters } = require('../models/recipes')
const { getters: userGetters } = require('../models/users')
const validator = require('express-validator')
const { Error_Messages } = require('../utils/errors_handler')

const asyncAction = (action) => (req, res, next) => action(req, res, next).catch(next)

// create comment
module.exports.create = [
    // validations rules
    validator.body('content', Error_Messages.description_is_empty).isLength({ min: 1 }),
    validator.body('user_id', Error_Messages.not_integer).isInt(),
    validator.body('user_id').custom(async value => {
        const user = await userGetters.findById(value)
        if (!user) return Promise.reject({ message: Error_Messages.user_not_found })
    }),
    validator.body('recipe_id', Error_Messages.not_integer).isInt(),
    validator.body('recipe_id').custom(async value => {
        const recipe = await recipeGetters.findById(value)
        if (!recipe) return Promise.reject({ message: Error_Messages.recipe_not_found })
    }),

    asyncAction(async (req, res) => {
        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })
        try {
            const comment = await commentMutations.create(req.body)
            res.json(comment)
        } catch (err) {
            console.log(err)
        }
    })
]

// update comment
module.exports.update = [
    // validations rules
    validator.body('content', Error_Messages.description_is_empty).isLength({ min: 1 }),

    asyncAction(async (req, res) => {
        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

        const data = req.body
        const id = req.params.id
        try {
            const commentPatched = await commentMutations.patch(id, data)
            if (!commentPatched) return res.status(404).json({ message: Error_Messages.comment_not_found })
            res.json(commentPatched)
        } catch (err) {
            console.log(err)
        }
    })
]

// delete comment
module.exports.delete = asyncAction(async (req, res) => {
    const id = req.params.id
    const commentDeleted = await commentMutations.deleteById(id)
    if (!commentDeleted) return res.status(404).json({ message: Error_Messages.comment_not_found })
    res.json('comment deleted').send()
})
