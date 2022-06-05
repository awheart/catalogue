const express = require('express')
const routes = require('./routes')
const router = express.Router({ strict: true })
const { database } = require('./database')
const { initTables } = require('./database/db')

const api = express()

api.use(express.json())
api.use(express.urlencoded({ extended: true }))
api.use(router)
api.use(routes)

if (process.env.NODE_ENV !== 'test') {
    database.migrateLastest().then(err => {
        if (err) console.log(err)
        initTables()
    })
}

module.exports = api
