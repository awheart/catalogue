const router = require('express').Router({ strict: true })
const users = require('./routes/user.routes')
const recipes = require('./routes/recipe.routes')

router.use('/api/users', users)
router.use('/api/articles', recipes)
module.exports = router