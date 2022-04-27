/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', t => {
        t.increments('id')
        t.string('username')
        t.string('email')
        t.string('password')
        t.byteA('icone')
        t.string('role')
        t.timestamp('created_at')
        t.timestamp('updated_at')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('users')
}
