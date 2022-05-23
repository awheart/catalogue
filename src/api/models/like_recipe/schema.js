const model = require('../model')

class LikeRecipe extends model {
    static get tableName() {
        return 'likeRecipe'
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

module.exports = LikeRecipe
