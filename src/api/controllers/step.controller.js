const { getters: stepGetters, mutations: stepMutations } = require('../models/steps')
const { getters: recipeGetters } = require('../models/recipes')
const validator = require('express-validator')
const { Error_Messages } = require('../utils/errors_handler')

const asyncAction = (action) => (req, res, next) => action(req, res, next).catch(next)

// get all steps
module.exports.getAll = asyncAction(async (req, res) => {
    const filter = req.query
    const steps = await stepGetters.getAll(filter)
    return res.json(steps)
})


// create steps
module.exports.create = [
    // validations rules
    validator.body('content', Error_Messages.description_is_empty).isLength({ min: 1 }),
    validator.body('recipe_id', Error_Messages.not_integer).isInt(),
    validator.body('recipe_id').custom(async value => {
        const recipe = await recipeGetters.findById(value)
        if (!recipe) return Promise.reject({ message: Error_Messages.recipe_not_found })
    }),
    validator.body('step_order', Error_Messages.order_is_needed).notEmpty().isInt(),

    asyncAction(async (req, res) => {
        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })
        try {
            const step = await stepMutations.create(req.body)
            res.json(step)
        } catch (err) {
            console.log(err)
        }
    })
]

// delete step
module.exports.delete = asyncAction(async (req, res) => {
    const id = req.params.id
    const stepDeleted = await stepMutations.deleteById(id)
    if (!stepDeleted) return res.status(404).json({ message: Error_Messages.comment_not_found })
    res.json('step deleted').send()
})
