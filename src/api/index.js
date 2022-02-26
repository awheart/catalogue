const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// import api routes
const users = require('./routes/users')
const articles = require('./routes/articles')

// use api routes
app.use(users)
app.use(articles)

module.exports = {
    path: '/api',
    handler: app
}
