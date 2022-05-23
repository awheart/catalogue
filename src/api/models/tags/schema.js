const model = require('../model')

class Tags extends model {
    static get tableName() {
        return 'tag'
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

module.exports = Tags
