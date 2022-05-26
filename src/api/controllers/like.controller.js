const { getters: likeGetters, mutations: likeMutations } = require('../models/like_recipe')
const { getters: recipeGetters } = require('../models/recipes')
const { getters: userGetters } = require('../models/users')
const validator = require('express-validator')
const { Error_Messages } = require('../utils/errors_handler')

const asyncAction = (action) => (req, res, next) => action(req, res, next).catch(next)

// create comment
module.exports.create = [
    // validations rules
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
            // check if user has liked recipe
            const { user_id, recipe_id } = req.body
            const userHasLiked = await likeGetters.findOne({ user_id })
            const recipeIsLiked = await likeGetters.findOne({ recipe_id })
            if (userHasLiked && recipeIsLiked) return res.json({ message: Error_Messages.already_liked })

            const like = await likeMutations.create(req.body)
            res.json(like)
        } catch (err) {
            console.log(err)
        }
    })
]

// delete comment
module.exports.delete = asyncAction(async (req, res) => {
    const id = req.params.id
    const like = await likeGetters.findOne({ recipe_id: id })
    const likeDeleted = await likeMutations.deleteById(like.id)
    if (!likeDeleted) return res.status(404).json({ message: Error_Messages.comment_not_found })
    res.json('like deleted').send()
})
