const router = require('express').Router({ strict: true })
const users = require('./routes/user.routes')
const recipes = require('./routes/recipe.routes')
const comments = require('./routes/comment.routes')
const steps = require('./routes/step.routes')
const likes = require('./routes/like.routes')

router.use('/api/users', users)
router.use('/api/recipes', recipes)
router.use('/api/comments', comments)
router.use('/api/likes', likes)
router.use('/api/steps', steps)

module.exports = router
