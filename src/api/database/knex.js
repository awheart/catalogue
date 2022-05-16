const environment = process.env.NODE_ENV
const knex = require('knex')
const config = require('../../../knexfile.js')[environment]

module.exports = knex(config)