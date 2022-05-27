const { getters: recipeTagsGetters, mutations: recipeTagsMutations } = require('../models/tag_recipe')
const { getters: recipeGetters } = require('../models/recipes')
const { getters: tagGetters } = require('../models/tags')
const validator = require('express-validator')
const { Error_Messages } = require('../utils/errors_handler')

const asyncAction = (action) => (req, res, next) => action(req, res, next).catch(next)

// create recipe tag
module.exports.create = [
    // validations rules
    validator.body('tag_id', Error_Messages.not_integer).isInt(),
    validator.body('tag_id').custom(async value => {
        const user = await tagGetters.findById(value)
        if (!user) return Promise.reject({ message: Error_Messages.tag_not_found })
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
            const { tag_id, recipe_id } = req.body
            const tag = await recipeTagsGetters.findOne({ tag_id })
            const recipeIsTaged = await recipeTagsGetters.findOne({ recipe_id })
            if (tag && recipeIsTaged) return res.json({ message: Error_Messages.already_taged })

            const like = await recipeTagsMutations.create(req.body)
            res.json(like)
        } catch (err) {
            console.log(err)
        }
    })
]

// delete recipe tag
module.exports.delete = asyncAction(async (req, res) => {
    const id = req.params.id
    const recipeTagDeleted = await recipeTagsMutations.deleteById(id)
    if (!recipeTagDeleted) return res.status(404).json({ message: Error_Messages.recipe_tag_not_found })
    res.json('recipe tag deleted').send()
})
