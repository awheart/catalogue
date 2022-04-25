const model = require('../model')

class users extends model {
    static get tableName() {
        return 'users'
    }
    static get idColumn() {
        return 'users_id'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                users_id: { type: 'integer' },
                username: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                social_media: { type: 'string' },
                icone: { type: 'object' },
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
