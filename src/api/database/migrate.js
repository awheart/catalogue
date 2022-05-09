const knex = require('./knex')

exports.migrateLastest = async () => knex.migrate.latest().then(response => console.info('Lastest migration succeeded', { response }))