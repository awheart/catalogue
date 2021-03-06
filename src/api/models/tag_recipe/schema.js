const model = require('../model')

class TagRecipe extends model {
    static get tableName() {
        return 'tag_recipe'
    }
    static get idColumn() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                tag_id: { type: 'integer' },
                recipe_id: { type: 'integer' }
            }
        }
    }
}

module.exports = TagRecipe
