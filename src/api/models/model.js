const knex = require('../database/knex')
const { Model } = require('objection')
const Ajv = require("ajv")
const addFormats = require("ajv-formats")

const ajv = new Ajv()
addFormats(ajv)

Model.knex(knex)

module.exports = Model