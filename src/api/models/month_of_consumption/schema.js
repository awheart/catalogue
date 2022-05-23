const model = require('../model')

class MonthOfConsumption extends model {
    static get tableName() {
        return 'monthOfConsumption'
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

module.exports = MonthOfConsumption
