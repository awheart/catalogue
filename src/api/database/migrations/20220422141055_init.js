
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return Promise.all([
    knex.schema.createTable('users', t => {
        t.increments('id').primary()
        t.string('username', 255).notNullable().unique()
        t.string('email', 255).notNullable().unique()
        t.string('password', 255).notNullable()
        t.string('icone')
        t.string('role')
        t.timestamp('birth_date')
        t.string('description', 255)
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('recipes', t => {
        t.increments('id').primary()
        t.string('title', 255).notNullable().unique()
        t.string('author').references('username').inTable('users')
        t.integer('prep_time')
        t.integer('cook_time')
        t.string('image')
        t.json('likes')
        t.boolean('is_published').defaultTo(false)
        t.string('price')
        t.string('description', 255)
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('comment_recipe', t => {
        t.increments('id').primary()
        t.string('user_name').references('username').inTable('users')
        t.integer('recipe_id', 11).references('id').inTable('recipes')
        t.string('content', 255)
        t.string('id_ref').defaultTo(null)
        t.timestamp('created_at').defaultTo(knex.fn.now())
    })
    .createTable('step', t => {
        t.increments('id').primary()
        t.string('content', 255)
        t.integer('order')
        t.integer('recipe_id', 11).unsigned().references('id').inTable('recipes')
    })
    .createTable('month_of_consumption', t => {
        t.increments('id').primary()
        t.enu('month', ['non renseigné','Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']).defaultTo('non renseigné')
    })
    .createTable('ingredients', t => {
        t.increments('id').primary()
        t.string('ingredient_name', 255).notNullable()
    })
    ])
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return Promise.all([
        knex.schema
        .dropTable('ingredients')
        .dropTable('month_of_consumption')
        .dropTable('step')
        .dropTable('comment_recipe')
        .dropTable('recipes')
        .dropTable('users')
    ])
}
