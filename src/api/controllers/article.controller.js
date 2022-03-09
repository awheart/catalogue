const articleModel = require('../models/article.model')
const validator = require('express-validator')

const asyncAction = (action) => (req, res, next) => action(req, res, next).catch(next)

// get all articles
module.exports.list = asyncAction(async (req, res) => {
    const articles = await articleModel.find()
    res.json(articles)
})

// get one article
module.exports.showOne = asyncAction(async (req, res) => {
    const id = req.params.id
    const article = await articleModel.findById(id)
    res.json(article)
})

// create article
module.exports.create = [
    // validations rules
    validator.body('title', 'Title is required').isLength({ min: 1 }),
    validator.body('title').custom(async value => {
        const titleCheck = await articleModel.find({ title: value })
        console.log(titleCheck)
        if (titleCheck.length !== 0) return Promise.reject('Title already exist' )
  }),
  validator.body('author', 'Author name is required').isLength({ min: 1 }),
  validator.body('content', 'Content is required').isLength({ min: 1 }),

    asyncAction(async (req, res) => {

        // throw validation errors
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() });
        }
        const article = new articleModel(req.body, err => {
            if (err) return res.status(500).json({ message: 'Error saving article', error: err })
        })
        article.save((err, article) => {
            if (err) return res.status(500).json({ message: 'Error while saving', error: err })
            res.json(article)
        })

    })
]

// update article
module.exports.update = [
    // validations rules
    validator.body('title', 'Title is required').isLength({ min: 1 }),
    validator.body('title').custom(async value => {
        const titleCheck = await articleModel.find({ title: value })
        if (titleCheck.length !== 0) return Promise.reject('Title already exist' )
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
    const article = await articleModel.findByIdAndUpdate({ _id: id }, data, { new: true })

    // not found
    if (!article) return res.status(404).json({ message: 'Article not found' })
    res.json(article)
})
]

// delete article
module.exports.delete = asyncAction(async (req, res) => {
    const id = req.params.id
    const article = await articleModel.findById(id)
    if(!article) return res.status(404).json({ message: 'Article not found'})
    await articleModel.deleteOne({ _id: id })
    res.json('Article deleted').send()    
})
