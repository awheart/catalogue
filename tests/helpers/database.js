const knex = require('knex')
const config = require('../../knexfile')
const database = require('../../src/api/database/knex')
const userData = require('../user/user.data')

const { mutations: userMutations, /*Recipes*/ } = require('../../src/api/models/users')

const initDBTest = knex(config.test)

exports.migrateUp = async () => database.migrate.up()

exports.migrateDown = async () => database.migrate.rollback()

exports.insertUsers = async () => userMutations.create(userData.insertIntoDB)
