const model = require('../model')

class ListIngredient extends model {
    static get tableName() {
        return 'listIngredient'
    }
    static get idColumn() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                content: { type: 'string' },
                inlist_order: { type: 'integer' },
            }
        }
    }
}

module.exports = ListIngredient
