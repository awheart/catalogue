const { getters: recipeGetters, mutations: recipeMutations } = require('../models/recipes')
const { getters: userGetters } = require('../models/users')
const { deleteRecipeCascade: deleteRecipeRelation } = require('../utils/delete_cascade')
const validator = require('express-validator')
const { Error_Messages } = require('../utils/errors_handler')

const asyncAction = (action) => (req, res, next) => action(req, res, next).catch(next)

// get all recipes
module.exports.getAll = asyncAction(async (req, res) => {
    const filter = req.query
    const recipes = await recipeGetters.getAll(filter)
    res.json(recipes)
})

// get one recipe
module.exports.findOne = asyncAction(async (req, res) => {
    const id = req.params.id
    const recipe = await recipeGetters.findById(id)
    if (!recipe) return res.status(404).json({ message: Error_Messages.recipe_not_found })
    res.json(recipe)
})

// create recipe
module.exports.create = [
    // validations rules
    validator.body('title', Error_Messages.title_is_empty).isLength({ min: 1 }),
    validator.body('title').custom(async value => {
        const titleCheck = await recipeGetters.findOne({ title: value })
        if (titleCheck) return Promise.reject(Error_Messages.title_existing)
    }),
    validator.body('user_id', Error_Messages.not_integer).isInt(),
    validator.body('user_id').custom(async value => {
        const user = await userGetters.findById(value)
        if (!user) return Promise.reject({ message: Error_Messages.user_not_found })
    }),
    validator.body('steps', Error_Messages.step_is_needed).isLength({ min: 1 }),
    validator.body('list_ingredient', Error_Messages.ingredient_is_needed).isLength({ min: 1 }),
    validator.body('description', Error_Messages.description_is_empty).isLength({ min: 1 }),
    asyncAction(async (req, res) => {

        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })
        try {
            const recipe = await recipeMutations.create(req.body)
            res.json(recipe)
        } catch (err) {
            console.log(err)
        }
    })
]

// update recipe
module.exports.update = [
    // validations rules
    validator.body('title', Error_Messages.title_is_empty).isLength({ min: 1 }),
    validator.body('title').custom(async (value, { req }) => {
        const { id } = req.body
        const titleCheck = await recipeGetters.findOne({ title: value })
        if (titleCheck && (titleCheck.id != id)) return Promise.reject(Error_Messages.title_existing)
    }),
    validator.body('id').isInt().custom(async value => {
        console.log('id: ', value)
        const recipe = await recipeGetters.findById(value)
        if (!recipe) return Promise.reject(Error_Messages.recipe_not_found)
    }),
    validator.body('steps', Error_Messages.step_is_needed).notEmpty(),
    validator.body('steps.*.step_order', Error_Messages.order_is_needed).isInt(),
    validator.body('list_ingredient', Error_Messages.ingredient_is_needed).notEmpty(),
    validator.body('list_ingredient.*.inlist_order', Error_Messages.order_is_needed).isInt(),
    validator.body('description', Error_Messages.description_is_empty).isLength({ min: 1 }),

    asyncAction(async (req, res) => {
        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        }

        const data = req.body

        try {
            const recipePatched = await recipeMutations.patch(data)
            res.json(recipePatched)
        } catch (err) {
            console.log(err)
        }
    })
]

// delete recipe
module.exports.delete = asyncAction(async (req, res) => {
    const recipe_id = req.params.id
    await deleteRecipeRelation(recipe_id)
    const recipeDeleted = await recipeMutations.deleteById(recipe_id)
    if (!recipeDeleted) return res.status(404).json({ message: Error_Messages.recipe_not_found })
    res.json('recipe deleted').send()
})
