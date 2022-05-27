const model = require('../model')

class Months extends model {
    static get tableName() {
        return 'months'
    }
    static get idColumn() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                month: { type: 'string' }
            }
        }
    }
}

module.exports = Months
