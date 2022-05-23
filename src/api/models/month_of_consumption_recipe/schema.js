const model = require('../model')

class MonthOfConsumtionRecipe extends model {
    static get tableName() {
        return 'monthOfConsumptionRecipe'
    }
    static get idColumn() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' }
            }
        }
    }
}

module.exports = MonthOfConsumtionRecipe
