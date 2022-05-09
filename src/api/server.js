const express = require('express')
const routes = require('./routes')
const router = express.Router({ strict: true })
const migrateLastest = require('./database/migrate')
const cors = require('cors')

const api = express()

api.use(cors())
api.use(express.json())
api.use(express.urlencoded({ extended: true }))
api.use(router)
api.use(routes)

if(process.env.NODE_ENV !== 'test') migrateLastest()


module.exports = api
