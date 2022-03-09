const router = require('express').Router({ strict: true })
const articlesController = require('../controllers/article.controller')

// get articles
router.get('/', articlesController.list)

// get one article
router.get('/:id', articlesController.showOne)

// create a new article
router.post('/', articlesController.create)

// update an article
router.patch('/:id', articlesController.update)

// delete an article
router.delete('/:id', articlesController.delete)

module.exports = router