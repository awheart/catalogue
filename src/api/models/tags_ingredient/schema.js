const model = require('../model')

class TagsIngredient extends model {
    static get tableName() {
        return 'tagIngredient'
    }
    static get idColumn() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                tag_name: { type: 'string' },
            }
        }
    }
}

module.exports = TagsIngredient
