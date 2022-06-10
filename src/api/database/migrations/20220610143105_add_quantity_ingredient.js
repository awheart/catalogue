/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => {
    return Promise.all([
        knex.schema.table('list_ingredient', t => {
            t.integer('quantity', 125).defaultTo('0')
            t.string('unit_of_mesure', 255)
        })
    ])
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => {
    return Promise.all([
        knex.schema.table('list_ingredient', t => {
            t.dropColumn('unit_of_mesure')
            t.dropColumn('quantity')
        })
    ])
};
