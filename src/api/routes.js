const router = require('express').Router({ strict: true })
const users = require('./routes/user.routes')
const articles = require('./routes/article.routes')

router.use('/api/users', users)
router.use('/api/articles', articles)
module.exports = router