const Article = require('../models/article.model')
const validator = require('express-validator')

// get all articles from
module.exports.list = (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) return res.status(500).json({ message: 'Error getting records' })
        return res.json(articles)
    })
}

// get one article from
module.exports.showOne = (req, res) => {
    const id = req.params.id
    Article.findOne({ _id: id }, (err, article) => {
        if (err) return res.status(500).json({ message: 'Error getting this article' })
        if (!article) return res.status(500).json({ message: 'Article not found' })
        return res.json(article)
    })
}

// create article
module.exports.create = [
    // validation needed
    validator.body('title', 'Enter article name').isLength({ min: 3 }),
    validator.body('title').custom(value => {
        return Article.findOne({ title:value }).then(article => {
            if (article !== null) return Promise.reject('Title is already existing')
        })
    }),
    validator.body('author', 'Enter author name').isLength({ min: 1 }),
    validator.body('body', 'Enter article description').isLength({ min: 4 }),

    (req, res) => {
        // validation errors
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })

        const article = new Article({
            title: req.body.title,
            author: req.body.author,
            body: req.body.body
        })

        // save article
        article.save((err, article) => {
            if (err) return res.status(500).json({ message: 'Error saving article', error: err })
            return res.json({ message: 'article saved', _id: article._id })
        })
    },
]

// update article
module.exports.update = [
    // validations needed
    validator.body('title', 'Enter article updated name').isLength({ min: 1 }),
    validator.body('title').custom((value, { req }) => {
        return Article.findOne({ title:value, _id:{ $ne: req.params.id } })
        .then(article => {
            if (article !== null) return Promise.reject('Title already used')
        })
    }),
    validator.body('author', 'Enter author updated name').isLength({ min: 1 }),
    validator.body('body', 'Enter article content').isLength({ min: 1 }),

    (req, res) => {
        // validation error
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() })
        const id = req.params.id
        Article.findOne({ _id: id }, (err, article) => {
            if (err) return res.status(500).json({ message: 'Error getting this article', error: err })
            if (!article) return res.status(404).json({ message: 'Article not found' })

            // init article
            article.title = req.body.title ? req.body.title : article.title
            article.author = req.body.title ? req.body.title : article.author
            article.body = req.body.body ? req.body.body : article.body

            // save article
            article.save((err, article) => {
                if (err) return res.status(500).json({ message: 'Error saving this article' })
                if (!article) return res.status(404).json({ message: 'Article not found' })
                return res.json(article)
            })
        })
    }
]

// delete article
module.exports.delete = (req, res) => {
    const id = req.params.id
    return Article.deleteOne(id, (err, article) => {
        if (err) return res.status(500).json({ message: 'Error'})
        return res.json(article)
    })
}
