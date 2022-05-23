const { getters: recipeGetter, mutations: recipeMutations } = require('../models/recipes')
const validator = require('express-validator')
const jwt = require('jsonwebtoken')
const { Error_Messages } = require('../utils/errors_handler')
const encryption = require('../utils/encryption')

const asyncAction = (action) => (req, res, next) => action(req, res, next).catch(next)

// get all recipes
module.exports.getAll = asyncAction(async (req, res) => {
    const filter = req.query
    const recipes = await recipeGetter.getAll(filter)
    res.json(recipes)
})

// get one recipe
module.exports.findOne = asyncAction(async (req, res) => {
    const id = req.params.id
    const recipe = await recipeGetter.findById(id)
    if (!recipe) return res.status(404).json({ message: Error_Messages.recipe_not_found })
    res.json(recipe)
})

// create recipe
module.exports.create = [
    // validations rules
    validator.body('title', Error_Messages.title_is_empty).isLength({ min: 1 }),
    validator.body('title').custom(async value => {
        const titleCheck = await recipeGetter.findOne({ title: value })
        if (titleCheck) return Promise.reject(Error_Messages.title_existing)
    }),
    validator.body('description', Error_Messages.description_is_empty).isLength({ min: 1 }),
    asyncAction(async (req, res) => {

        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })

        const recipe = await recipeMutations.create(req.body)
        res.json(recipe)

    })
]

// update recipe
module.exports.update = [
    // validations rules
    validator.body('title', Error_Messages.title_is_empty).isLength({ min: 1 }),
    validator.body('title').custom(async value => {
        const titleCheck = await recipeGetter.findOne({ title: value })
        if (titleCheck) return Promise.reject(Error_Messages.title_existing)
    }),
    validator.body('description', Error_Messages.description_is_empty).isLength({ min: 1 }),

    asyncAction(async (req, res) => {
        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        }

        const data = req.body
        const id = req.params.id

        try {
            const recipePatched = await recipeMutations.patch(id, data)
            if (!recipePatched) return res.status(404).json({ message: Error_Messages.recipe_not_found })
            res.json(recipePatched)
        } catch (err) {
            console.log(err)
        }

    })
]

// delete recipe
module.exports.delete = asyncAction(async (req, res) => {
    const id = req.params.id
    const recipeDeleted = await recipeMutations.deleteById(id)
    if (!recipeDeleted) return res.status(404).json({ message: Error_Messages.recipe_not_found })
    res.json('recipe deleted').send()
})
