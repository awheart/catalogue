const router = require('express').Router({ strict: true })
const users = require('./routes/user.routes')
const recipes = require('./routes/recipe.routes')
const comments = require('./routes/comment.routes')

router.use('/api/users', users)
router.use('/api/recipes', recipes)
router.use('/api/comments', comments)
module.exports = router