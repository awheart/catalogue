const knex = require('knex')
const config = require('../../knexfile')
const database = require('../../src/api/database/knex')
const userData = require('../user/user.data')
const recipeData = require('../recipe/recipe.data')

const { mutations: userMutations } = require('../../src/api/models/users')
const { mutations: recipeMutations } = require('../../src/api/models/recipes')

const initDBTest = knex(config.test)

exports.initializeDatabase = async () => {
    try {
      await initDBTest.raw('DROP DATABASE IF EXISTS test_database')
      await initDBTest.raw('CREATE DATABASE test_database')
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

exports.insertUsers = async () => userMutations.create(userData.insertIntoDB)
exports.insertRecipes = async () => recipeMutations.create(recipeData.insertIntoDB)
