const knex = require('knex')
const config = require('../../knexfile')
const database = require('../../src/api/database/knex')
const userData = require('../user/user.data')
const { Users, /*Recipes*/ } = require('../../src/api/models')

const initDBTest = knex(config.test)

exports.initializeDatabase = async () => {
    try {
        await initDBTest.raw('DROP DATABASE IF EXISTS test_database')
        console.log('dropped test_database')
        await initDBTest.raw('CREATE DATABASE test_database')
        console.log('created test_database')
    } catch (err) {
        console.log('init test_database', err)
    }
}

exports.destroyDatabase = async () => {
    try {
        await database.destroy()
        await initDBTest.raw('DROP DATABASE IF EXISTS test_database')
    } catch (err) {
        console.log(err)
    } finally {
        await initDBTest.destroy()
    }
}

exports.migrateUp = async () => database.migrate.up()

exports.migrateDown = async () => database.migrate.rollback()

exports.insertUsers = async () => Users.mutations.create(userData.insertIntoDB)
