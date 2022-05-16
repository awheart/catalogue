const knex = require('../database/knex')
const { Model } = require('objection')

Model.knex(knex)

module.exports = Model