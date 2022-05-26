/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return Promise.all([
        knex.schema
            .createTable('user_role', t => {
                t.increments('id').primary()
                t.string('role_name')
            })
            .createTable('recipe_price', t => {
                t.increments('id').primary()
                t.string('price')
            })
            .createTable('tags', t => {
                t.increments('id').primary()
                t.string('tag_name')
            })
            .createTable('users', t => {
                t.increments('id').primary()
                t.string('username', 255).unique()
                t.string('email', 255).unique()
                t.string('password', 255)
                t.string('icone')
                t.timestamp('birth_date')
                t.string('description', 255)
                t.timestamp('created_at').defaultTo(knex.fn.now())
                t.timestamp('updated_at').defaultTo(knex.fn.now())
                t.integer('role_id').references('id').inTable('user_role')
            })
            .createTable('recipes', t => {
                t.increments('id').primary()
                t.string('title', 255)
                t.integer('user_id').references('id').inTable('users')
                t.integer('price_id').references('id').inTable('recipe_price')
                t.float('prep_time')
                t.float('cook_time')
                t.integer('nbr_person')
                t.string('image')
                t.boolean('is_published').defaultTo('false')
                t.string('description', 255)
                t.timestamp('created_at').defaultTo(knex.fn.now())
                t.timestamp('updated_at').defaultTo(knex.fn.now())
            })
            .createTable('step', t => {
                t.increments('id').primary()
                t.string('content', 255)
                t.integer('step_order')
                t.integer('recipe_id').references('id').inTable('recipes')
            })
            .createTable('months', t => {
                t.increments('id').primary()
                t.string('month', 255)
            })
            .createTable('list_ingredient', t => {
                t.increments('id').primary()
                t.string('content', 255)
                t.integer('inlist_order')
                t.integer('recipe_id').references('id').inTable('recipes')
            })
            .createTable('tag_recipe', t => {
                t.increments('id').primary()
                t.integer('tag_id').references('id').inTable('tags')
                t.integer('recipe_id').references('id').inTable('recipes')
            })
            .createTable('month_of_consumption', t => {
                t.increments('id').primary()
                t.integer('month_id').references('id').inTable('months')
                t.integer('recipe_id').references('id').inTable('recipes')
            })
            .createTable('like_recipe', t => {
                t.increments('id').primary()
                t.integer('user_id').references('id').inTable('users')
                t.integer('recipe_id').references('id').inTable('recipes')
            })
            .createTable('comment_recipe', t => {
                t.increments('id').primary()
                t.string('content', 255)
                t.timestamp('created_at').defaultTo(knex.fn.now())
                t.integer('user_id').references('id').inTable('users')
                t.integer('recipe_id').references('id').inTable('recipes')
                t.integer('comment_recipe_id').references('id').inTable('comment_recipe').nullable()
            })
            .createTable('refresh_tokens', t => {
                t.increments('id').primary()
                t.string('token')
            })
    ])
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return Promise.all([
        knex.schema
        .dropTable('user_role')
        .dropTable('recipe_price')
            .dropTable('refresh_tokens')
            .dropTable('comment_recipe')
            .dropTable('like_recipe')
            .dropTable('month_of_consumption_recipe')
            .dropTable('ingredient_recipe')
            .dropTable('list_ingredient')
            .dropTable('month_of_consumption')
            .dropTable('step')
            .dropTable('recipes')
            .dropTable('users')
            .dropTable('tag_ingredient')
    ])
}
