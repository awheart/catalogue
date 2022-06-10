const model = require('../model')

class RecipePrice extends model {
    static get tableName() {
        return 'price'
    }
    static get idColumn() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                price_name: { type: 'string' }
            }
        }
    }
}

module.exports = RecipePrice
