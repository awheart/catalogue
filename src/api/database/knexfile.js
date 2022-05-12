// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const dbconnect = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: '/catalogue/src/api/database/migrations',
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds',
    }
  }
}
module.exports = dbconnect
