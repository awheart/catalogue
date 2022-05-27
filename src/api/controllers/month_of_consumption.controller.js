const { getters: monthOfConsumptionGetters, mutations: monthOfConsumptionMutations } = require('../models/month_of_consumption')
const { getters: recipeGetters } = require('../models/recipes')
const { getters: monthGetters } = require('../models/months')
const validator = require('express-validator')
const { Error_Messages } = require('../utils/errors_handler')

const asyncAction = (action) => (req, res, next) => action(req, res, next).catch(next)

// create moc
module.exports.create = [
    // validations rules
    validator.body('month_id', Error_Messages.not_integer).isInt(),
    validator.body('month_id').custom(async value => {
        const user = await monthGetters.findById(value)
        if (!user) return Promise.reject({ message: Error_Messages.month_not_found })
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
            const { month_id, recipe_id } = req.body
            const month = await monthOfConsumptionGetters.findOne({ month_id })
            const recipeHasMonth = await monthOfConsumptionGetters.findOne({ recipe_id })
            if (month && recipeHasMonth) return res.json({ message: Error_Messages.month_already_added })

            const like = await monthOfConsumptionMutations.create(req.body)
            res.json(like)
        } catch (err) {
            console.log(err)
        }
    })
]

// delete moc
module.exports.delete = asyncAction(async (req, res) => {
    const id = req.params.id
    const monthOfConsumptionDeleted = await monthOfConsumptionMutations.deleteById(id)
    if (!monthOfConsumptionDeleted) return res.status(404).json({ message: Error_Messages.comment_not_found })
    res.json('moc deleted').send()
})
