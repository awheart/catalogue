const { getters: listIngredientGetters, mutations: listIngredientMutations } = require('../models/list_ingredient')
const { getters: recipeGetters } = require('../models/recipes')
const validator = require('express-validator')
const { Error_Messages } = require('../utils/errors_handler')

const asyncAction = (action) => (req, res, next) => action(req, res, next).catch(next)

// create lists ingredient
module.exports.create = [
    // validations rules
    validator.body('content', Error_Messages.description_is_empty).isLength({ min: 1 }),
    validator.body('recipe_id', Error_Messages.not_integer).isInt(),
    validator.body('recipe_id').custom(async value => {
        const listIngredient = await recipeGetters.findById(value)
        if (!listIngredient) return Promise.reject({ message: Error_Messages.recipe_not_found })
    }),
    validator.body('inlist_order', Error_Messages.not_integer).isInt(),

    asyncAction(async (req, res) => {
        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })
        try {
            const listIngredient = await listIngredientMutations.create(req.body)
            res.json(listIngredient)
        } catch (err) {
            console.log(err)
        }
    })
]

// update list ingredient
module.exports.update = [
    // validations rules
    validator.body('content', Error_Messages.description_is_empty).isLength({ min: 1 }),
    validator.body('inlist_order', Error_Messages.not_integer).isInt(),

    asyncAction(async (req, res) => {
        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

        const data = req.body
        const id = req.params.id

        try {
            const listIngredientPatched = await listIngredientMutations.patch(id, data)
            if (!listIngredientPatched) return res.status(404).json({ message: Error_Messages.ingredient_not_found })
            res.json(listIngredientPatched)
        } catch (err) {
            console.log(err)
        }
    })
]

// delete list ingredient
module.exports.delete = asyncAction(async (req, res) => {
    const id = req.params.id
    const listIngredientDeleted = await listIngredientMutations.deleteById(id)
    if (!listIngredientDeleted) return res.status(404).json({ message: Error_Messages.ingredient_not_found })
    res.json('list Ingredient deleted').send()
})
