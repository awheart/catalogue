const model = require('../model')

class RefreshToken extends model {
    static get tableName() {
        return 'refresh_token'
    }
    static get idColumn() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                token: { type: 'string' },
            }
        }
    }
}

module.exports = RefreshToken