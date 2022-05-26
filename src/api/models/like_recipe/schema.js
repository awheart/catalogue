const model = require('../model')
const Recipes = require('../recipes/schema')
const Users = require('../users/schema')

class LikeRecipe extends model {
    static get tableName() {
        return 'like_recipe'
    }
    static get idColumn() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                user_id: { type: 'integer' },
                recipe_id: { type: 'integer' }
            }
        }
    }
}

module.exports = LikeRecipe
