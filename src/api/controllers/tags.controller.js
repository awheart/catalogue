const { getters: tagGetters, mutations: tagMutations } = require('../models/tags')
const validator = require('express-validator')
const { Error_Messages } = require('../utils/errors_handler')

const asyncAction = (action) => (req, res, next) => action(req, res, next).catch(next)

// get all tag
module.exports.getAll = asyncAction(async (req, res) => {
    const filter = req.query
    const tags = await tagGetters.getAll(filter)
    res.json(tags)
})

// get one tag
module.exports.findOne = asyncAction(async (req, res) => {
    const id = req.params.id
    const tag = await tagGetters.findById(id)
    if (!tag) return res.status(404).json({ message: Error_Messages.tag_not_found })
    res.json(tag)
})

// create tag
module.exports.create = [
    // validations rules
    validator.body('tag_name', Error_Messages.tag_is_empty).isLength({ min: 1 }),
    validator.body('tag_name').custom(async value => {
        const nameCheck = await tagGetters.findOne({ tag_name: value })
        if (nameCheck) return Promise.reject(Error_Messages.tag_existing)
    }),
    asyncAction(async (req, res) => {

        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })
        try {
            const recipe = await tagMutations.create(req.body)
            res.json(recipe)
        } catch (err) {
            console.log(err)
        }
    })
]

// update tag
module.exports.update = [
    // validations rules
    validator.body('tag_name', Error_Messages.tag_is_empty).isLength({ min: 1 }),
    validator.body('tag_name').custom(async value => {
        const nameCheck = await tagGetters.findOne({ tag_name: value })
        if (nameCheck) return Promise.reject(Error_Messages.tag_existing)
    }),

    asyncAction(async (req, res) => {
        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        }

        const data = req.body
        const id = req.params.id

        try {
            const tagPatched = await tagMutations.patch(id, data)
            if (!tagPatched) return res.status(404).json({ message: Error_Messages.tag_not_found })
            res.json(tagPatched)
        } catch (err) {
            console.log(err)
        }
    })
]
