const router = require('express').Router({ strict: true })
const users = require('./routes/user.routes')
const articles = require('./routes/article.routes')

router.use('/users', users)
router.use('/articles', articles)
router.get('/healthz', async (req, res) => {
    return res.status(200).json({ status: 'OK' })
})
router.get('/*', async (req, res) => {
    return res.status(404).json({ error: { message: 'dead' } })
})

module.exports = router