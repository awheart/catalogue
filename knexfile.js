/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  test: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST || 'localhost',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: 'test_database',
      port: 5432
    },
    pool: {
      min: 0,
      max: 20
    },
    migrations: {
      tableName: 'knex_migrations_test',
      directory: './src/api/database/migrations'
    }
  },
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST || 'localhost',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'dev_database',
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/api/database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './src/api/database/seeds',
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
      directory: './src/api/database/migrations',
      tableName: 'knex_migrations_prod'
    },
    seeds: {
      directory: './src/api/database/seeds',
    }
  }
}
