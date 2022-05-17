const model = require('../model')

class users extends model {
    static get tableName() {
        return 'users'
    }
    static get idColumn() {
        return 'id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                icone: { type: 'string' },
                role: {
                    type: 'string',
                    enum: ['admin', 'user'],
                    default: 'user'
                }
            }
        }
    }
    $beforeInsert() {
        this.created_at = new Date()
        this.updated_at = new Date()
    }
    $beforeUpdate() {
        this.updated_at = new Date()
    }
}

module.exports = users
