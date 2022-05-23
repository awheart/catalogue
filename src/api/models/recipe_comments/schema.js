const model = require('../model')

class RecipeComment extends model {
    static get tableName() {
        return 'recipeComment'
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
            }
        }
    }
    $beforeInsert() {
        this.created_at = new Date()
    }
}

module.exports = RecipeComment
