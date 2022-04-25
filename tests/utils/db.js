const knex = require('knex')
const knexfile = require('../../src/api/database/knexfile')
const dbconnect ={
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

module.exports = {
  knex,
  knexfile,
  dbconnect
}