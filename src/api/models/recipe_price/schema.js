const model = require('../model')

class RecipePrice extends model {
    static get tableName() {
        return 'recipe_price'
    }
    static get idColumn() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                price: { type: 'string' }
            }
        }
    }
}

module.exports = RecipePrice
