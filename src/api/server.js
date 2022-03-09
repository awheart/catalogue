const express = require('express')
const routes = require('./routes')
const router = express.Router({ strict: true })
const db = require('./db')

const api = express()

api.use(express.json())
api.use(express.urlencoded({ extended: true }))
api.use(router)
api.use(routes)

db.init()

module.exports = api
