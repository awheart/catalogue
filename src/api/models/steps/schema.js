const model = require('../model')

class Step extends model {
    static get tableName() {
        return 'step'
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
                step_order: { type: 'integer' }
            }
        }
    }
}

module.exports = Step
