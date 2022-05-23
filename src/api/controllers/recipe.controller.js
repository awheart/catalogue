const recipeModel = require('../models/recipes')
const validator = require('express-validator')
const { Error_Messages } = require('../utils/errors_handler')

const asyncAction = (action) => (req, res, next) => action(req, res, next).catch(next)

// get all recipes
module.exports.list = asyncAction(async (req, res) => {
    const recipes = await recipeModel.find()
    res.json(recipes)
})

// get one recipe
module.exports.showOne = asyncAction(async (req, res) => {
    const id = req.params.id
    const recipe = await recipeModel.findById(id)
    res.json(recipe)
})

// create recipe
module.exports.create = [
    // validations rules
    validator.body('title', Error_Messages.title_is_empty).isLength({ min: 1 }),
    validator.body('title').custom(async value => {
        const titleCheck = await recipeModel.find({ title: value })
        console.log(titleCheck)
        if (titleCheck.length !== 0) return Promise.reject(Error_Messages.title_existing )
  }),
  validator.body('description', Error_Messages.description_is_empty).isLength({ min: 1 }),

    asyncAction(async (req, res) => {

        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })

        const recipe = new recipeModel(req.body, err => {
            if (err) return res.status(500).json({ message: Error_Messages.error_saving, error: err })
        })
        recipe.save((err, recipeSaved) => {
            if (err) return res.status(500).json({ message: Error_Messages.error_saving, error: err })
            res.json(recipeSaved)
        })

    })
]

// update recipe
module.exports.update = [
    // validations rules
    validator.body('title', 'Title is required').isLength({ min: 1 }),
    validator.body('title').custom(async value => {
        const titleCheck = await recipeModel.find({ title: value })
        if (titleCheck.data.length !== 0) return Promise.reject('Title already exist' )
    }),
    validator.body('author', 'Author name is required').isLength({ min: 1 }),
    validator.body('content', 'Content is required').isLength({ min: 1 }),

    asyncAction(async (req, res) => {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    const data = req.body
    const id = req.params.id
    const recipe = await recipeModel.findByIdAndUpdate({ _id: id }, data, { new: true })

    // not found
    if (!recipe) return res.status(404).json({ message: 'recipe not found' })
    res.json(recipe)
})
]

// delete recipe
module.exports.delete = asyncAction(async (req, res) => {
    const id = req.params.id
    const recipe = await recipeModel.findById(id)
    if(!recipe) return res.status(404).json({ message: 'recipe not found'})
    await recipeModel.deleteOne({ _id: id })
    res.json('recipe deleted').send()    
})
