const express = require('express')
const routes = require('./routes')
const router = express.Router({ strict: true })
const database = require('./database/migrate')
const cors = require('cors')

const api = express()

api.use(cors())
api.use(express.json())
api.use(express.urlencoded({ extended: true }))
api.use(router)
api.use(routes)

if (process.env.NODE_ENV !== 'test') database.migrateLastest()


module.exports = api
