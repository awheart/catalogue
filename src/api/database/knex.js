let environment = process.env.NODE_ENV
const knex = require('knex')
let config = require('../../../knexfile.js')[environment]

module.exports = knex(config)