const model = require('../model')

class MonthOfConsumtion extends model {
    static get tableName() {
        return 'month_of_consumption'
    }
    static get idColumn() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                month_id: { type: 'integer' },
                recipe_id: { type: 'integer' }
            }
        }
    }
}

module.exports = MonthOfConsumtion
