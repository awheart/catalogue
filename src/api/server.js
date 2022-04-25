const express = require('express')
const routes = require('./routes')
const router = express.Router({ strict: true })
const cors = require('cors')

const api = express()

api.use(cors())
api.use(express.json())
api.use(express.urlencoded({ extended: true }))
api.use(router)
api.use(routes)

module.exports = api
