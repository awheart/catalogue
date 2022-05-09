const knex = require('knex')
const knexfile = require('../../knexfile')
module.exports = {
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
  knexfile
}