const model = require('../model')

class Ingredient extends model {
    static get tableName() {
        return 'ingredient'
    }
    static get idColumn() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
            }
        }
    }
}

module.exports = Ingredient
