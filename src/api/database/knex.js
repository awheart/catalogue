let environment = process.env.NODE_ENV
let config = require('./knexfile.js')[environment]

module.exports = require('knex')(config)